package com.sulleong.recommend.repository;

import java.util.List;

public interface RecommendRepositoryCustom {

    List<Long> recommendBeersByMyFavoriteBeers(List<Long> beerIds);

    List<Long> recommendBeersByFavoriteBeers();

}
