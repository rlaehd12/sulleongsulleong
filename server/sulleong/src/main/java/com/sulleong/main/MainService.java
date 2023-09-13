package com.sulleong.main;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.PreferenceService;
import com.sulleong.recommend.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MainService {

    private final BeerService beerService;
    private final MemberService memberService;
    private final PreferenceService preferenceService;
    private final RecommendRepository recommendRepository;

    /**
     * 사용자에게 알맞는 맥주를 추천합니다.
     * @param memberId 사용자 아이디
     * @return 사용자가 좋아요 누른 맥주들과 가장 유사한 맥주 4개를 반환합니다.
     */
    public MainResponse getTodayBeers(Long memberId) throws Exception {
        // 사용자가 좋아요를 누른 맥주들의 식별자를 가져옵니다.
        Member member = memberService.getMemberOrElseThrow(memberId);
        List<Beer> myBeers = preferenceService.getPreferBeers(memberId).getBeers();
        List<Long> myBeerIds = myBeers.stream().map(Beer::getId).collect(Collectors.toList());

        // 좋아요를 누른 맥주들과 가장 유사도가 높은 맥주들을 가져옵니다.
        List<Long> similarBeerIds = recommendRepository.recommendBeersByFavoriteBeers(myBeerIds);
        List<Beer> similarBeers = beerService.getBeersByBeerIds(similarBeerIds);
        List<TodayBeer> todayBears = similarBeers.stream().map(beer ->
                TodayBeer.builder()
                        .id(beer.getId())
                        .image(beerService.getBeerImage(beer.getNameKor()))
                        .name(beer.getName())
                        .build()
        ).collect(Collectors.toList());
        return MainResponse.builder()
                .memberName(member.getName())
                .todayBeers(todayBears)
                .build();
    }

}
