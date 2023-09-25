package com.sulleong.beer;

import com.sulleong.beer.dto.*;
import com.sulleong.beer.repository.BeerRepository;
import com.sulleong.exception.BeerNotFoundException;
import com.sulleong.preference.Preference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BeerService {

    private final BeerRepository beerRepository;

    public static final String IMAGE_URL = "https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_";

    /**
     * 맥주 선호도 조사를 위해 설문용 맥주들을 제시합니다.
     * @return 일정 비율의 에일, 라거, 기타 맥주들을 랜덤으로 선택하여 반환합니다.
     */
    public SurveyResponse getSurveyBeers() throws Exception {
        // 설문을 위한 맥주 정보 리스트
        List<SurveyResponseEntry> entries = beerRepository.getRandomBeers(20).stream().map(beer ->
                SurveyResponseEntry.builder()
                        .id(beer.getId())
                        .image("https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_" + beer.getId())
                        .nameKor(beer.getNameKor())
                        .build()
        ).collect(Collectors.toList());
        return new SurveyResponse(entries);
    }

    /**
     * 맥주를 검색합니다.
     * @param searchParam 검색을 위한 키워드, 페이지 정보입니다.
     * @return 맥주 검색 결과를 반환합니다.
     */
    public SearchResponse getSearchBeers(Long memberId, SearchParam searchParam) throws Exception {
        Integer pageIndex = searchParam.getPage();
        Integer pageSize = searchParam.getSize();
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
        Page<Beer> beerPage = beerRepository.findAllBySearchParam(searchParam.getKeyword(), pageable);
        Page<SearchResponseEntry> entryPage = beerPage.map(beer -> {
            List<Preference> preferences = beer.getPreferences();
            return SearchResponseEntry.builder()
                    .id(beer.getId())
                    .image("https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_" + beer.getId())
                    .name(beer.getName())
                    .nameKor(beer.getNameKor())
                    .abv(beer.getAbv())
                    .largeCategory(beer.getLargeCategory())
                    .subCategory(beer.getSubCategory())
                    .country(beer.getCountry())
                    .score(null) // 별점은 리뷰 기능 구현 후 추가 예정
                    .prefer(preferences.stream().anyMatch(preference -> preference.getMember().getId().equals(memberId)))
                    .preferCount(preferences.size())
                    .build();
        });

        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setEntries(entryPage.getContent());

        // Cursor-based
        if (entryPage.hasPrevious()) {
            searchResponse.setPrevCursor((searchParam.getPage() - 1) * searchParam.getSize());
        }
        if (entryPage.hasNext()) {
            searchResponse.setNextCursor((searchParam.getPage()) * searchParam.getSize() + 1);
        }

        return searchResponse;
    }

    /**
     * 맥주 식별자들로 맥주 정보들을 가져옵니다.
     * @param beerIds 맥주 식별자 리스트입니다.
     * @return 맥주 정보 리스트를 반환합니다.
     */
    public List<Beer> getBeersByBeerIds(List<Long> beerIds) {
        return beerRepository.findAllByBeerIds(beerIds);
    }

    /**
     * 맥주 정보를 가져옵니다.
     * @param beerId 맥주 식별자입니다.
     * @return 맥주 정보 입니다.
     */
    public Beer getBeerOrElseThrow(Long beerId) {
        return beerRepository.findById(beerId)
                .orElseThrow(() -> new BeerNotFoundException("존재하지 않은 술 ID: " + beerId));
    }

}
