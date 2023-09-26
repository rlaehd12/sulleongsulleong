package com.sulleong.review;

import com.sulleong.beer.Beer;
import com.sulleong.common.BaseTimeEntity;
import com.sulleong.member.Member;
import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Review extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Beer beer;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer appearance;

    private Integer aroma;

    private Integer mouthfeel;

    private Integer flavor;

    private Integer overall;

    private Integer score;

    public Review(Member member, Beer beer, BeerReviewCreateForm form) {
        this.member = member;
        this.beer = beer;
        this.content = form.getContent();
        this.score = form.getScore();
    }

    protected Review() {
    }
}
