package com.sulleong.review.create.controller;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.review.create.ReviewCreateService;
import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import com.sulleong.review.create.controller.dto.response.BeerReviewCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewCreateController implements ReviewCreateControllerDocs {

    private final ReviewCreateService reviewCreateService;

    @Override
    @LoginCheck(type = LoginCheck.UserType.USER)
    @PostMapping("/beers/{beerId}")
    public BeerReviewCreateResponse createReview(@PathVariable("beerId") Long beerId, @RequestBody BeerReviewCreateForm form, HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        long memberId = authMember.getId();
        reviewCreateService.checkDuplicatedComment(beerId, memberId);
        return reviewCreateService.create(beerId, memberId, form);
    }
}
