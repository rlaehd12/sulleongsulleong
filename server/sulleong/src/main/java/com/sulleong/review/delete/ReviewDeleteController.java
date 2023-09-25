package com.sulleong.review.delete;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import com.sulleong.review.create.controller.dto.response.BeerReviewCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewDeleteController implements ReviewDeleteControllerDocs{

    private final ReviewDeleteService reviewDeleteService;

    @LoginCheck(type = LoginCheck.UserType.USER)
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable("reviewId") Long reviewId, HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        reviewDeleteService.delete(reviewId, authMember.getId());
        return ResponseEntity.ok().build();
    }
}
