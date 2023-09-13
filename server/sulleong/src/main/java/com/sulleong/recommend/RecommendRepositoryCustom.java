package com.sulleong.recommend;

import java.util.List;

public interface RecommendRepositoryCustom {

    List<Long> recommendBeersByFavoriteBeers(List<Long> beerIds);

}
