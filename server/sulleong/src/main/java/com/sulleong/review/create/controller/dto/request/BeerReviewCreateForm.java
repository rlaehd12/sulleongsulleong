package com.sulleong.review.create.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BeerReviewCreateForm {

    private String content;

    private Integer score;
}
