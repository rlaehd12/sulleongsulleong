package com.sulleong.review;

import com.sulleong.beer.Beer;
import com.sulleong.member.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Beer beer;

    private Integer appearance;

    private Integer aroma;

    private Integer mouthfeel;

    private Integer flavor;

    private Integer overall;

    @Column(columnDefinition = "TEXT")
    private String content;

}
