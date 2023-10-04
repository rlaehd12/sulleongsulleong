package com.sulleong.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByBeerIdAndMemberId(Long beerId, Long memberId);

    Optional<Review> findByIdAndMemberId(Long reviewId, Long memberId);

    // ID가 크다는건 가장 나중에 생성된 거라 볼 수 있다.
    List<Review> findTop5ByBeerIdOrderByIdDesc(Long beerId);

    @Query("SELECT score FROM Review r WHERE r.id <= 50000 AND r.beer.id = :beerId")
    List<Review> findBeerReviews(@Param("beerId") Long beerId);

}
