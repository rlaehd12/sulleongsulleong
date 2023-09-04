package com.sulleong.beer.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {

    private Integer prevCursor = null;

    private List<SearchResponseEntry> entries;

    private Integer nextCursor = null;

}
