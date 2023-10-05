package com.sulleong.recommend;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long beer1;

    private Long beer2;

    private Double distance;

}
