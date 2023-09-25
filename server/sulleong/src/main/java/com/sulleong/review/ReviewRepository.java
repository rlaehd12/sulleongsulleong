package com.sulleong.review;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByIdAndMemberId(Long reviewId, Long memberId);

    // ID가 크다는건 가장 나중에 생성된 거라 볼 수 있다.
    List<Review> findTop5ByBeerIdOrderByIdDesc(Long beerId, Pageable pageable);

}
