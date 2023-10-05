package com.sulleong.review.delete;

import com.sulleong.exception.ReviewNotFoundException;
import com.sulleong.member.MemberService;
import com.sulleong.review.Review;
import com.sulleong.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewDeleteService {

    private final ReviewRepository reviewRepository;

    public void delete(Long reviewId, Long memberId) {
        Review review = reviewRepository.findByIdAndMemberId(reviewId, memberId)
                .orElseThrow(() -> new ReviewNotFoundException("리뷰 삭제 오류"));
        reviewRepository.delete(review);
    }
}
