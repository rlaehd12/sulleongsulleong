package com.sulleong.recommend.dto;

import com.sulleong.beer.Beer;
import com.sulleong.common.ImageUri;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomRecommendResponseEntry {

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

    public static CustomRecommendResponseEntry create(Beer beer, Long memberId, Double score) {
        return CustomRecommendResponseEntry.builder()
                .id(beer.getId())
                .image(ImageUri.URI.getValue() + beer.getId())
                .name(beer.getName())
                .nameKor(beer.getNameKor())
                .abv(beer.getAbv())
                .largeCategory(beer.getLargeCategory())
                .subCategory(beer.getSubCategory())
                .country(beer.getCountry())
                .score(score) // 별점은 리뷰 기능 구현 후 추가 예정
                .prefer(beer.getPreferences().stream().anyMatch(preference -> preference.getMember().getId().equals(memberId)))
                .preferCount(beer.getPreferences().size())
                .build();
    }

}
