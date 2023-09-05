package com.sulleong.recommend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BeerSimilarityRepository extends JpaRepository<BeerSimilarity, Long>, BeerSimilarityRepositoryCustom {
}
