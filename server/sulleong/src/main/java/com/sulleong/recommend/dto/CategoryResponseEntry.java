package com.sulleong.recommend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CategoryResponseEntry {

    private String category;

    private List<RecommendBeer> recommendBeers;

}
