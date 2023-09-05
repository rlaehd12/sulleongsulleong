package com.sulleong.recommend;

import java.util.List;

public interface BeerSimilarityRepositoryCustom {

    List<Long> recommendBeersByFavoriteBeers(List<Long> beerIds);

}
