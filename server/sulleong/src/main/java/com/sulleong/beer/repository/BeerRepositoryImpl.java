package com.sulleong.beer.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sulleong.beer.Beer;
import com.sulleong.beer.QBeer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BeerRepositoryImpl implements BeerRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QBeer beer = QBeer.beer;

    @Override
    public List<Beer> getRandomBeers(Integer count) {
        return queryFactory
                .selectFrom(beer)
                .orderBy(NumberExpression.random().asc())
                .limit(count)
                .fetch();
    }

    @Override
    public Page<Beer> findAllBySearchParam(String keyword, Pageable pageable) {
        keyword = "%" + keyword + "%";
        QueryResults<Beer> queryResults = queryFactory
                .selectFrom(beer)
                .where(beer.name.like(keyword).or(beer.nameKor.like(keyword)))
                .orderBy(beer.nameKor.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }

    @Override
    public List<Beer> findAllByBeerIds(List<Long> beerIds) {
        return queryFactory
                .selectFrom(beer)
                .where(beer.id.in(beerIds))
                .fetch();
    }
}
