package com.sulleong.beer.repository;

import com.sulleong.beer.Beer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BeerRepositoryCustom {

    Page<Beer> findAllBySearchParam(String keyword, Pageable pageable);

}
