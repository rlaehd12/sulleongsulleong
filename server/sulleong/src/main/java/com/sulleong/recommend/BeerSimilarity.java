package com.sulleong.recommend;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class BeerSimilarity {

    @Id
    @Column(name = "beer_similarity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long beer1;

    private Long beer2;

    private Double distance;

}
