package com.sulleong.beer.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchParam {

    private String keyword;

    private Integer page;

    private Integer size;

}
