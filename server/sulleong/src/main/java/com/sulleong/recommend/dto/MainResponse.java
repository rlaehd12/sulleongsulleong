package com.sulleong.recommend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MainResponse {

    private String memberName;

    private List<RecommendBeer> todayBeers;

    private List<RecommendBeer> popularBeers;

    private List<RecommendBeer> similarPeoplesBeers;

}
