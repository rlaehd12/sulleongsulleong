package com.sulleong.recommend.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sulleong.recommend.QRecommend;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecommendRepositoryImpl implements RecommendRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QRecommend qRecommend = QRecommend.recommend;

    @Override
    public List<Long> recommendBeersByFavoriteBeers(List<Long> beerIds) {
        return queryFactory
                .select(qRecommend.beer2)
                .from(qRecommend)
                .where(qRecommend.beer1.in(beerIds))
                .where(qRecommend.beer2.notIn(beerIds))
                .orderBy(qRecommend.distance.asc())
                .limit(4)
                .fetch();
    }
}
