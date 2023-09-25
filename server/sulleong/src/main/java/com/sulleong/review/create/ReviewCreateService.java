package com.sulleong.review.create;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import com.sulleong.review.Review;
import com.sulleong.review.ReviewRepository;
import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import com.sulleong.review.create.controller.dto.response.BeerReviewCreateResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewCreateService {

    private final ReviewRepository reviewRepository;

    private final MemberService memberService;

    private final BeerService beerService;

    public BeerReviewCreateResponse create(Long beerId, Long memberId, BeerReviewCreateForm form) {
        Member member = memberService.getMemberOrElseThrow(memberId);
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        Review review = new Review(member, beer, form);
        review = reviewRepository.save(review);
        return new BeerReviewCreateResponse(review);
    }
}
