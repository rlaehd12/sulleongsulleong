package com.sulleong.beer.dto;

import com.sulleong.beer.Beer;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchResponseEntry {

    private Long id;

    private String image;

    private String name;

    private String nameKor;

    private Double abv;

    private String largeCategory;

    private String subCategory;

    private String country;

    private Double score;

    private Boolean prefer;

    private Integer preferCount;

    public static SearchResponseEntry create(Beer beer, Long memberId, Integer preferCount, String imageUrl, Double score, boolean isPrefer) {
        return SearchResponseEntry.builder()
                .id(beer.getId())
                .image(imageUrl + beer.getId())
                .name(beer.getName())
                .nameKor(beer.getNameKor())
                .abv(beer.getAbv())
                .largeCategory(beer.getLargeCategory())
                .subCategory(beer.getSubCategory())
                .country(beer.getCountry())
                .score(score) // 별점은 리뷰 기능 구현 후 추가 예정
                .prefer(isPrefer)
                .preferCount(preferCount)
                .build();
    }

}
