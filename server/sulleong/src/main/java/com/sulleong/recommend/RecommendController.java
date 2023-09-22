package com.sulleong.recommend;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.recommend.dto.MainResponse;
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
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping
    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @Operation(summary = "메인 화면 추천", description = "메인 페이지에 진입 시에 3가지 방식으로 맥주를 추천")
    public ResponseEntity<MainResponse> mainRecommend(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        String memberName = authMember.getName();
        List<RecommendBeer> todayBeers = recommendService.getTodayBeers(memberId);
        List<RecommendBeer> popularBeers = recommendService.getPopularBeers();
        List<RecommendBeer> similarPeoplesBeers = recommendService.getSimilarPeoplesBeers(memberId);
        MainResponse mainResponse = new MainResponse(memberName, todayBeers, popularBeers, similarPeoplesBeers);
        return ResponseEntity.ok(mainResponse);
    }

}
