package com.sulleong.recommend;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Recommend {

    @Id
    @Column(name = "recommend_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long beer1;

    private Long beer2;

    private Double distance;

}
