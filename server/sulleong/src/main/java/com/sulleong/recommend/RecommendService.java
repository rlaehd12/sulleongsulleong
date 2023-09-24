package com.sulleong.recommend;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.preference.PreferenceService;
import com.sulleong.recommend.dto.CategoryResponseEntry;
import com.sulleong.recommend.dto.RecommendBeer;
import com.sulleong.recommend.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
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

    /**
     * 사용자가 관심있어 하는 카테고리를 분석하여 각 카테고리별로 맥주를 추천합니다.
     * @return 관심있는 카테고리별 추천 맥주를 10개씩 반환합니다.
     */
    public List<CategoryResponseEntry> getRecommendCategoryBeers(Long memberId) {
        List<CategoryResponseEntry> categoryResponseEntries = new ArrayList<>();
        List<String> categories = recommendRepository.findMyFavoriteCategories(memberId);
        for (String category : categories) {
            categoryResponseEntries.add(getPopularBeersWithCategory(category));
        }
        return categoryResponseEntries;
    }

    /**
     * 카테고리별 가장 인기있는 맥주를 가져옵니다.
     * @return 카테고리 이름과 카테고리별 가장 좋아요가 많은 맥주 10개를 반환합니다.
     */
    private CategoryResponseEntry getPopularBeersWithCategory(String category) {
        List<Long> beerIds = recommendRepository.recommendBeersByLargeCategory(category);
        List<Beer> beers = beerService.getBeersByBeerIds(beerIds);
        return new CategoryResponseEntry(category, beers.stream().map(beer ->
                RecommendBeer.builder()
                        .id(beer.getId())
                        .image(imageUrl + beer.getId())
                        .name(beer.getName())
                        .build()
        ).collect(Collectors.toList()));
    }

}
