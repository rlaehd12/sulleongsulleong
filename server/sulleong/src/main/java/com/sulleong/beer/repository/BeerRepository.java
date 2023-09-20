package com.sulleong.beer.repository;

import com.sulleong.beer.Beer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeerRepository extends JpaRepository<Beer, Long>, BeerRepositoryCustom {
}
