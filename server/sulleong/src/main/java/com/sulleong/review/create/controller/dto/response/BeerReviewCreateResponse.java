package com.sulleong.review.create.controller.dto.response;

import com.sulleong.review.Review;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BeerReviewCreateResponse {

    private Long id;

    private String content;

    private Integer score;

    public BeerReviewCreateResponse(Review review) {
        this.id = review.getId();
        this.content = review.getContent();
        this.score = review.getScore();
    }
}
