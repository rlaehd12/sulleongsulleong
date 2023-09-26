package com.sulleong.recommend.repository;

import java.util.List;

public interface RecommendRepositoryCustom {

    List<Long> recommendBeersByMyFavoriteBeers(List<Long> beerIds, Integer count);

    List<Long> recommendBeersByFavoriteBeers();

    List<Long> recommendBeersByAgeAndGender(Integer age, String gender);

    List<String> findMyFavoriteCategories(Long memberId);

    List<Long> recommendBeersByLargeCategory(String category);

}
