package com.sulleong.recommend;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.recommend.dto.CategoryRecommendResponse;
import com.sulleong.recommend.dto.CustomRecommendResponse;
import com.sulleong.recommend.dto.MainRecommendResponse;
import com.sulleong.recommend.dto.RecommendBeer;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/beers/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping("/main")
    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @Operation(summary = "메인 화면 추천", description = "메인 페이지에 진입 시에 3가지 방식으로 맥주를 추천")
    public ResponseEntity<MainRecommendResponse> mainRecommend(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        String memberName = authMember.getName();
        List<RecommendBeer> todayBeers = recommendService.getTodayBeers(memberId);
        List<RecommendBeer> popularBeers = recommendService.getPopularBeers();
        List<RecommendBeer> similarPeoplesBeers = recommendService.getSimilarPeoplesBeers(memberId);
        MainRecommendResponse mainResponse = new MainRecommendResponse(memberName, todayBeers, popularBeers, similarPeoplesBeers);
        return ResponseEntity.ok(mainResponse);
    }

    @GetMapping("/category")
    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @Operation(summary = "카테고리별 추천", description = "사용자가 관심있어 하는 카테고리 순서로 맥주를 추천")
    public ResponseEntity<CategoryRecommendResponse> categoryRecommend(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        CategoryRecommendResponse categoryResponse = new CategoryRecommendResponse(recommendService.getRecommendCategoryBeers(memberId));
        return ResponseEntity.ok(categoryResponse);
    }

    @GetMapping("/rank")
    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @Operation(summary = "사용자 맞춤형 추천", description = "협업 필터링 추천 방식으로 사용자에게 가장 적합한 맥주들을 추천")
    public ResponseEntity<CustomRecommendResponse> customRecommend(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        CustomRecommendResponse response = recommendService.getCustomizedBeers(memberId);
        return ResponseEntity.ok(response);
    }

}
