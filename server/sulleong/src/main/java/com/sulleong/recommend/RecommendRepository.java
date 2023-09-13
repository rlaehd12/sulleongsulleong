package com.sulleong.recommend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<Recommend, Long>, RecommendRepositoryCustom {
}
