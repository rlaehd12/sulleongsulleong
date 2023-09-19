package com.sulleong.preference;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.beer.Beers;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.dto.TogglePreferResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;
    private final MemberService memberService;
    private final BeerService beerService;

    /**
     * 좋아요 누른 이력을 바탕으로 새로 만들거나 기존 정보 업데이트합니다.
     */
    @Transactional
    public TogglePreferResponse togglePreference(Long memberId, Long beerId) {
        Optional<Preference> optionalPreference = findPreference(memberId, beerId);
        Preference preference;
        if (optionalPreference.isEmpty()) {
            preference = createAndSaveNewPreference(memberId, beerId);
            return new TogglePreferResponse(preference);
        }
        preference = optionalPreference.get();
        preference.toggleChoice();
        preference.setUpdatedAt();

        return new TogglePreferResponse(preference);
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

    private Optional<Preference> findPreference(Long memberId, Long beerId) {
        return preferenceRepository.findByMemberIdAndBeerId(memberId, beerId);
    }

    /**
     * 좋아요 누른 기록이 있다면 토글합니다.
     */
    private Preference toggleChoiceAndSave(Preference preference) {
        preference.toggleChoice();
        return preferenceRepository.save(preference);
    }

    /**
     * 좋아요 누른 기록이 없는 경우 새로 생성합니다.
     */
    private Preference createAndSaveNewPreference(Long memberId, Long beerId) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        Preference newPreference = new Preference(member, beer);
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

}
