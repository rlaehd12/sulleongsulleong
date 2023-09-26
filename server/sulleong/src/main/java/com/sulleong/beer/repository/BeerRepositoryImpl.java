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
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.sulleong.beer.QBeer.beer;
import static com.sulleong.review.QReview.review;

@Repository
@RequiredArgsConstructor
public class BeerRepositoryImpl implements BeerRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QBeer beer = QBeer.beer;

    @Override
    public List<Beer> getRandomBeers(Integer count) {
        return queryFactory
                .selectFrom(beer)
                .where(beer.nameKor.isNotNull())
                .orderBy(NumberExpression.random().asc())
                .limit(count)
                .fetch();
    }

    @Override
    public Page<Beer> findAllBySearchParam(String keyword, Pageable pageable) {
        String pattern = "%" + keyword.toLowerCase() + "%";
        QueryResults<Beer> queryResults = queryFactory
                .selectFrom(beer)
                .where(beer.name.toLowerCase().like(pattern).or(beer.nameKor.like(pattern)))
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

    @Override
    public List<Beer> getDictBeers() {
        return queryFactory.
                selectFrom(beer)
                .where(beer.nameKor.isNotNull())
                .fetch();
    }

    @Override
    public List<Beer> getDictBeerByMemberid(Long memberId) {
        return queryFactory
                .selectFrom(beer).distinct()
                .join(review)
                .on(beer.id.eq(review.beer.id))
                .where(beer.nameKor.isNotNull().and(review.member.id.eq(memberId)))
                .fetch();
    }
}
