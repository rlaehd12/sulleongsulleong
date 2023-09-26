package com.sulleong.beer.dict;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor
public class DictBeersResponse {

    List<DictBeerEntry> beers;

    Integer beerCount;

    public static DictBeersResponse createResponse(List<DictBeerEntry> beers, Integer count) {
        return new DictBeersResponse(beers, count);
    }
}
