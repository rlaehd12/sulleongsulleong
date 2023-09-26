package com.sulleong.beer;

import com.sulleong.aop.LoginCheck;
import com.sulleong.beer.dto.SearchParam;
import com.sulleong.beer.dto.SearchResponse;
import com.sulleong.beer.dto.SurveyResponse;
import com.sulleong.login.dto.AuthMember;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/beers")
@RequiredArgsConstructor
public class BeerController {

    private final BeerService beerService;

    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @GetMapping("/survey")
    @Operation(summary = "맥주 설문 폼", description = "맥주 선호도 조사를 위해 설문용 맥주들을 제시")
    public ResponseEntity<SurveyResponse> getSurveyBeers() {
        return ResponseEntity.ok(beerService.getSurveyBeers());
    }

    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @GetMapping("/search")
    @Operation(summary = "맥주 검색", description = "입력한 내용을 포함하는 맥주 검색")
    public ResponseEntity<SearchResponse> getSearchBeers(HttpServletRequest request, @ModelAttribute SearchParam param) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();

        // 페이지 정보 기본값 설정
        if (param.getPage() == null) {
            param.setPage(1);
        }
        if (param.getSize() == null) {
            param.setSize(10);
        }
        SearchResponse response = beerService.getSearchBeers(memberId, param);
        return ResponseEntity.ok(response);
    }

}
