package com.sulleong.beer;

import com.sulleong.beer.dto.*;
import com.sulleong.beer.repository.BeerRepository;
import com.sulleong.exception.BeerNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BeerService {

    private final BeerRepository beerRepository;

    @Value("${image-base-url}")
    private String imageUrl;

    /**
     * 맥주 선호도 조사를 위해 설문을 합니다.
     *
     * @return 일정 비율의 에일, 라거, 기타 맥주들을 랜덤으로 선택하여 반환합니다.
     */
    @Transactional(readOnly = true)
    public FavoriteResponse getSurveyBeers() throws Exception {
        // 설문을 위한 맥주 정보 리스트
        List<FavoriteResponseEntry> entries = new ArrayList<>();

        // 맥주 카테고리 및 추출할 맥주 수
        String[] categories = {"ALE", "LAGER", "ETC"};
        int[] counts = {7, 10, 3};

        // 각 카테고리별 맥주 리스트 랜덤으로 가져오기
        for (int i = 0; i < 3; i++) {
            List<Beer> beerList = beerRepository.findAllByLargeCategory(categories[i]);
            Collections.shuffle(beerList);

            // 각 카테고리별로 추출 후 타입 변환
            entries.addAll(beerList.subList(1, counts[i] + 1).stream().map(beer ->
                    FavoriteResponseEntry.builder()
                            .id(beer.getId())
                            .image(imageUrl + "/" + beer.getNameKor().replace(" ", "") + ".png")
                            .name(beer.getName())
                            .largeCategory(beer.getLargeCategory())
                            .build()
            ).collect(Collectors.toList()));
        }

        // 전체 순서 변경 후 반환
        Collections.shuffle(entries);
        return new FavoriteResponse(entries);
    }

    /**
     * 맥주를 검색합니다.
     *
     * @param searchParam 검색을 위한 키워드, 페이지 정보입니다.
     * @return 맥주 검색 결과를 반환합니다.
     */
    public SearchResponse getSearchBeers(SearchParam searchParam) throws Exception {
        Integer pageIndex = searchParam.getPage();
        Integer pageSize = searchParam.getSize();
        Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
        Page<Beer> beerPage = beerRepository.findAllBySearchParam(searchParam.getKeyword(), pageable);
        Page<SearchResponseEntry> entryPage = beerPage.map(beer ->
                SearchResponseEntry.builder()
                        .id(beer.getId())
                        .image(imageUrl + "/" + beer.getNameKor().replace(" ", "") + ".png")
                        .name(beer.getName())
                        .nameKor(beer.getNameKor())
                        .abv(beer.getAbv())
                        .largeCategory(beer.getLargeCategory())
                        .subCategory(beer.getSubCategory())
                        .country(beer.getCountry())
                        .score(null) // 별점은 리뷰 기능 구현 후 추가 예정
                        .build());

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

    public Beer getBeerOrElseThrow(Long beerId) {
        return beerRepository.findById(beerId)
                .orElseThrow(() -> new BeerNotFoundException("존재하지 않은 술 ID: " + beerId));
    }

}
