package com.sulleong.beer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

}
