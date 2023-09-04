package com.sulleong.beer;

import com.sulleong.preference.Preference;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
public class Beer {

    @Id
    @Column(name = "beer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "beer", fetch = FetchType.LAZY)
    private List<Preference> preferences;

    private String name; // 맥주 이름 (영어)

    private String nameKor; // 맥주 이름 (한글)

    private String className; // 클래스 이름

    private String largeCategory; // 대분류 (영어)

    private String subCategory; // 소분류(영어)

    private String country; // 국가

    private Double abv; // 알코올 도수

    private Double aroma; // 향 점수

    private Double appearance; // 외관 점수

    private Double flavor; // 맛 점수

    private Double mouthfeel; // 목넘김 점수

}
