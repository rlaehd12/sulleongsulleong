package com.sulleong.beer.dto;

import lombok.*;

@Getter
@Setter
public class SearchParam {

    private String keyword;

    private Integer page;

    private Integer size;

}
