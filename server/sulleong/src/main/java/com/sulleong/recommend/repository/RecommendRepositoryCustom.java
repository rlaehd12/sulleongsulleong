package com.sulleong.recommend.repository;

import java.util.List;

public interface RecommendRepositoryCustom {

    List<Long> recommendBeersByFavoriteBeers(List<Long> beerIds);

}
