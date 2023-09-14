package com.sulleong.recommend;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.recommend.dto.MainResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @GetMapping
    @Operation(summary = "오늘의 맥주 추천", description = "메인 페이지에 진입 시 좋아요한 맥주를 기반으로 랜덤 추천")
    public ResponseEntity<MainResponse> getTodayBeers(HttpServletRequest request) throws Exception {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        return ResponseEntity.ok(recommendService.getTodayBeers(memberId));
    }

}
