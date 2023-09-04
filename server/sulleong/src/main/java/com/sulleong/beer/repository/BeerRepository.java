package com.sulleong.beer.repository;

import com.sulleong.beer.Beer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long>, BeerRepositoryCustom {

    List<Beer> findAllByLargeCategory(String largeCategory);

}
