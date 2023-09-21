package com.sulleong.recommend;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.PreferenceService;
import com.sulleong.recommend.dto.RecommendBeer;
import com.sulleong.recommend.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommendService {

    private final BeerService beerService;
    private final MemberService memberService;
    private final PreferenceService preferenceService;
    private final RecommendRepository recommendRepository;
    private final String imageUrl = "https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_";

    /**
     * 오늘의 맥주를 추천합니다.
     * @param memberId 사용자 아이디
     * @return 사용자가 좋아요 누른 맥주들과 가장 유사한 맥주 4개를 반환합니다.
     */
    public List<RecommendBeer> getTodayBeers(Long memberId) {
        // 사용자가 좋아요를 누른 맥주들의 식별자를 가져옵니다.
        List<Beer> myBeers = preferenceService.getPreferBeers(memberId).getBeers();
        List<Long> myBeerIds = myBeers.stream().map(Beer::getId).collect(Collectors.toList());

        // 좋아요를 누른 맥주들과 가장 유사도가 높은 맥주들을 가져옵니다.
        List<Long> similarBeerIds = recommendRepository.recommendBeersByMyFavoriteBeers(myBeerIds);
        List<Beer> similarBeers = beerService.getBeersByBeerIds(similarBeerIds);
        return similarBeers.stream().map(beer ->
                RecommendBeer.builder()
                        .id(beer.getId())
                        .image(imageUrl + beer.getId())
                        .name(beer.getName())
                        .build()
        ).collect(Collectors.toList());
    }

    /**
     * 인기있는 맥주를 추천합니다.
     * @return 모든 사용자들이 누른 좋아요를 기반으로 추천하는 맥주 10개를 반환합니다.
     */
    public List<RecommendBeer> getPopularBeers() {
        List<Long> beerIds = recommendRepository.recommendBeersByFavoriteBeers();
        List<Beer> beers = beerService.getBeersByBeerIds(beerIds);
        return beers.stream().map(beer ->
            RecommendBeer.builder()
                    .id(beer.getId())
                    .image(imageUrl + beer.getId())
                    .name(beer.getName())
                    .build()
        ).collect(Collectors.toList());
    }

    /**
     * 사용자와 유사한 사람들에게 인기있는 맥주를 추천합니다.
     * @return 연령대 및 성별을 기반으로 추천하는 맥주 10개를 반환합니다.
     */
    public List<RecommendBeer> getSimilarPeoplesBeers(Long memberId) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        List<Long> beerIds = recommendRepository.recommendBeersByAgeAndGender(member.getAge(), member.getGender());
        List<Beer> beers = beerService.getBeersByBeerIds(beerIds);
        return beers.stream().map(beer ->
                RecommendBeer.builder()
                        .id(beer.getId())
                        .image(imageUrl + beer.getId())
                        .name(beer.getName())
                        .build()
        ).collect(Collectors.toList());
    }

}
