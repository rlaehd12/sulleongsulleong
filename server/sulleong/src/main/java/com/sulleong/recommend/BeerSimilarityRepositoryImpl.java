package com.sulleong.recommend;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BeerSimilarityRepositoryImpl implements BeerSimilarityRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QBeerSimilarity qBeerSimilarity = QBeerSimilarity.beerSimilarity;

    @Override
    public List<Long> recommendBeersByFavoriteBeers(List<Long> beerIds) {
        return queryFactory
                .select(qBeerSimilarity.beer2)
                .from(qBeerSimilarity)
                .where(qBeerSimilarity.beer1.in(beerIds))
                .where(qBeerSimilarity.beer2.notIn(beerIds))
                .orderBy(qBeerSimilarity.distance.asc())
                .limit(4)
                .fetch();
    }
}
