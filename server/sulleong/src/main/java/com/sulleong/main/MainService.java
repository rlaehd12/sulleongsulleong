package com.sulleong.main;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.PreferenceService;
import com.sulleong.recommend.BeerSimilarityRepository;
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
    private final BeerSimilarityRepository beerSimilarityRepository;

    /**
     * 유저에게 알맞는 맥주를 추천합니다.
     * @param memberId 사용자 아이디
     * @return
     * @throws Exception
     */
    public MainResponse getTodayBeers(Long memberId) throws Exception {
        Member member = memberService.getMemberOrElseThrow(memberId);
        List<Beer> myBeers = preferenceService.getPreferBeers(memberId).getBeers();
        List<Long> myBeerIds =  myBeers.stream().map(Beer::getId).collect(Collectors.toList());
        List<TodayBeer> todayBears = beerSimilarityRepository.recommendBeersByFavoriteBeers(myBeerIds).stream().map(beerId -> {
            Beer beer = beerService.getBeerOrElseThrow(beerId);
            return TodayBeer.builder()
                    .id(beerId)
                    .image(beerService.getBeerImage(beer.getNameKor()))
                    .name(beer.getName())
                    .build();
        }).collect(Collectors.toList());
        return MainResponse.builder()
                .memberName(member.getName())
                .todayBeers(todayBears)
                .build();
    }

}
