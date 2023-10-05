package com.sulleong.recommend.repository;

import com.sulleong.recommend.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<Recommend, Long>, RecommendRepositoryCustom {
}
