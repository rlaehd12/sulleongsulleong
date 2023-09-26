package com.sulleong.recommend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CustomRecommendResponse {

    private Integer prevCursor;

    private List<CustomRecommendResponseEntry> entries;

    private Integer nextCursor;

}
