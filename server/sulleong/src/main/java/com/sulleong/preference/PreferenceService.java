package com.sulleong.preference;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.beer.Beers;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.dto.TogglePreferResponse;
import com.sulleong.preference.total.TotalPreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;
    private final TotalPreferenceService totalPreferenceService;
    private final MemberService memberService;
    private final BeerService beerService;

    public static final int INCREMENT_ONE = 1;
    public static final int DECREMENT_ONE = -1;

    @Value("${domain}")
    private String DOMAIN;

    /**
     * 좋아요 누른 이력을 바탕으로 새로 만들거나 기존 정보 업데이트합니다.
     */
    @Transactional
    public TogglePreferResponse togglePreference(Long memberId, Long beerId) {
        Optional<Preference> optionalPreference = findPreference(memberId, beerId);
        Preference preference;
        if (optionalPreference.isEmpty()) {
            preference = createAndSaveNewPreference(memberId, beerId);
        }
        else {
            preference = toggleChoiceAndSave(optionalPreference.get());
        }
        return new TogglePreferResponse(preference, totalPreferenceService.getTotalPreference(beerId));
    }

    /**
     * 설문에서 선택한 맥주들을 바탕으로 좋아하는 맥주를 재설정합니다.
     */
    @Transactional
    public void setPreferences(Long memberId, List<Long> beerIds) {
        cancelAllPreferences(memberId);
        for (Long beerId : beerIds) {
            Optional<Preference> optionalPreference = findPreference(memberId, beerId);
            optionalPreference.map(this::toggleChoiceAndSave)
                    .orElseGet(() -> createAndSaveNewPreference(memberId, beerId));
        }
    }

    public Optional<Preference> findPreference(Long memberId, Long beerId) {
        return preferenceRepository.findByMemberIdAndBeerId(memberId, beerId);
    }

    /**
     * 좋아요 누른 기록이 있다면 토글 후, 캐시 반영
     */
    private Preference toggleChoiceAndSave(Preference preference) {
        boolean result = preference.toggleChoice();
        long beerId = preference.getBeer().getId();
        if (result) {
            totalPreferenceService.adjustPreference(beerId, INCREMENT_ONE);
        }
        else {
            totalPreferenceService.adjustPreference(beerId, DECREMENT_ONE);
        }
        return preferenceRepository.save(preference);
    }

    /**
     * 좋아요 누른 기록이 없는 경우 새로 생성합니다.
     */
    private Preference createAndSaveNewPreference(Long memberId, Long beerId) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        Preference newPreference = new Preference(member, beer);
        totalPreferenceService.adjustPreference(beerId, INCREMENT_ONE);
        return preferenceRepository.save(newPreference);
    }

    /**
     * 사용자가 눌렀던 좋아요를 모두 취소합니다.
     */
    private void cancelAllPreferences(Long memberId) {
        List<Preference> preferences = preferenceRepository.findByMemberId(memberId);
        for (Preference preference : preferences) {
            if (Boolean.TRUE.equals(preference.getChoice())) {
                preference.toggleChoice();
            }
            totalPreferenceService.adjustPreference(preference.getBeer().getId(), DECREMENT_ONE);
        }
    }

    /**
     * 사용자가 좋아요를 누른 맥주들을 모두 반환합니다.
     */
    public Beers getPreferBeers(Long memberId) {
        List<Preference> preferences = preferenceRepository.findByMemberId(memberId);
        return new Beers(preferences.stream()
                .filter(preference -> Boolean.TRUE.equals(preference.getChoice()))
                .map(Preference::getBeer)
                .collect(Collectors.toList()));
    }

    /**
     * 초기 사용자의 관심을 분석합니다.
     */
    public void analyzeInterest(Long memberId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForEntity(DOMAIN + "/recommend/initial/?mid={mid}", String.class, memberId);
    }

}
