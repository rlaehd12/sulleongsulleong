package com.sulleong.beer;

import com.sulleong.preference.Preference;
import com.sulleong.review.Review;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Beer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "beer", fetch = FetchType.LAZY)
    private List<Preference> preferences;

    @OneToMany(mappedBy = "beer", fetch = FetchType.LAZY)
    private List<Review> reviews;

    private String name; // 맥주 이름 (영어)

    private String nameKor; // 맥주 이름 (한글)

    private String largeCategory; // 대분류 (영어)

    private String subCategory; // 소분류(영어)

    private String country; // 국가

    private Double abv; // 알코올 도수

    private Long brewerId; // 양조자 식별자

    private Long appearance; // 외관 점수합

    private Long aroma; // 향 점수

    private Long mouthfeel; // 목넘김 점수합

    private Long flavor; // 맛 점수합

    private Long overall; // 총평 점수합

    private Integer reviewCount; // 리뷰수

}
