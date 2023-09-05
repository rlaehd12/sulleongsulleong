package com.sulleong.beer;

import lombok.Getter;

import java.util.List;

@Getter
public class Beers {

    private List<Beer> beers;

    public Beers(List<Beer> beers) {
        this.beers = beers;
    }
}
