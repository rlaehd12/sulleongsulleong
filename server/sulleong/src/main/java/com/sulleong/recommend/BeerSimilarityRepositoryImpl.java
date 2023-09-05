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
                .selectDistinct(qBeerSimilarity.beer2)
                .from(qBeerSimilarity)
                .where(qBeerSimilarity.distance.ne(0.0))
                .where(qBeerSimilarity.beer1.in(beerIds))
                .orderBy(qBeerSimilarity.distance.desc())
                .limit(8)
                .fetch();
    }
}
