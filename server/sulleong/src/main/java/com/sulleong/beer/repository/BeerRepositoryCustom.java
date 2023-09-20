package com.sulleong.beer.repository;

import com.sulleong.beer.Beer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BeerRepositoryCustom {

    List<Beer> getRandomBeers(Integer count);

    Page<Beer> findAllBySearchParam(String keyword, Pageable pageable);

    List<Beer> findAllByBeerIds(List<Long> beerIds);

}
