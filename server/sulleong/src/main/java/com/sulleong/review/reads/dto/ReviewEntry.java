package com.sulleong.review.reads.dto;

import com.sulleong.review.Review;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewEntry {

    private Long reviewId;

    private String content;

    private Integer score;

    public ReviewEntry(Review review) {
        this.reviewId = review.getId();
        this.content = review.getContent();
        this.score = review.getScore();
    }
}
