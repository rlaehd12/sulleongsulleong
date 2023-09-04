package com.sulleong.preference;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.beer.Beers;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;
    private final MemberService memberService;
    private final BeerService beerService;

    // 좋아요 누른 이력을 바탕으로 새로 만들거나 기존 정보 업데이트
    @Transactional
    public Preference setPreference(Long memberId, Long beerId) {
        Optional<Preference> optionalPreference = findPreference(memberId, beerId);
        return optionalPreference.map(this::toggleChoiceAndSave)
                .orElseGet(() -> createAndSaveNewPreference(memberId, beerId));
    }

    private Optional<Preference> findPreference(Long memberId, Long beerId) {
        return preferenceRepository.findByMemberIdAndBeerId(memberId, beerId);
    }
    // 좋아유 누른 기록이 있다면 토글
    private Preference toggleChoiceAndSave(Preference preference) {
        preference.toggleChoice();
        return preferenceRepository.save(preference);
    }
    // 좋아요 누른 기록이 없는 경우 새로 생성
    private Preference createAndSaveNewPreference(Long memberId, Long beerId) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        Preference newPreference = new Preference(member, beer);
        return preferenceRepository.save(newPreference);
    }

    public Beers getPreferBeers(Long memberId) {
        List<Preference> preferences = preferenceRepository.findByMemberId(memberId);
        return new Beers(preferences.stream()
                .filter(preference -> Boolean.TRUE.equals(preference.getChoice()))
                .map(Preference::getBeer)
                .collect(Collectors.toList()));
    }

}
