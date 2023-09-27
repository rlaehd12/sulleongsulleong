package com.sulleong.review.create;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.exception.DuplicatedCommentException;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.review.Review;
import com.sulleong.review.ReviewRepository;
import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import com.sulleong.review.create.controller.dto.response.BeerReviewCreateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewCreateService {

    private final ReviewRepository reviewRepository;

    private final MemberService memberService;

    private final BeerService beerService;

    public void checkDuplicatedComment(Long beerId, Long memberId) {
        Optional<Review> review = reviewRepository.findByBeerIdAndMemberId(beerId, memberId);
        if (review.isPresent()) {
            throw new DuplicatedCommentException("중복된 리뷰");
        }
    }

    @Transactional
    public BeerReviewCreateResponse create(Long beerId, Long memberId, BeerReviewCreateForm form) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        Review review = new Review(member, beer, form);
        review = reviewRepository.save(review);
        return new BeerReviewCreateResponse(review);
    }
}
