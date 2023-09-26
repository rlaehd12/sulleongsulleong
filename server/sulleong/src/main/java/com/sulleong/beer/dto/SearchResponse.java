package com.sulleong.beer.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SearchResponse {

    private Integer prevCursor;

    private List<SearchResponseEntry> entries;

    private Integer nextCursor;

}
