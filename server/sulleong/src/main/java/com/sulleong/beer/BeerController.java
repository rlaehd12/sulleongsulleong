package com.sulleong.beer;

import com.sulleong.beer.dto.SearchParam;
import com.sulleong.beer.dto.SearchResponse;
import com.sulleong.beer.dto.SurveyResponse;
import com.sulleong.member.MemberService;
import com.sulleong.preference.PreferenceService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/beers")
@RequiredArgsConstructor
public class BeerController {

    private final BeerService beerService;
    private final MemberService memberService;
    private final PreferenceService preferenceService;

    @GetMapping("/survey")
    @Operation(summary = "맥주 설문 폼", description = "맥주 선호도 조사를 위해 설문용 맥주들을 제시합니다.")
    public ResponseEntity<SurveyResponse> getSurveyBeers() throws Exception {
        return ResponseEntity.ok(beerService.getSurveyBeers());
    }

    @GetMapping("/search")
    @Operation(summary = "맥주 검색", description = "입력한 내용을 포함하는 맥주 검색")
    public ResponseEntity<SearchResponse> getSearchBeers(@ModelAttribute SearchParam searchParam) throws Exception {
        // 페이지 정보 기본값 설정
        if (searchParam.getPage() == null) {
            searchParam.setPage(1);
        }
        if (searchParam.getSize() == null) {
            searchParam.setSize(5);
        }
        return ResponseEntity.ok(beerService.getSearchBeers(searchParam));
    }

}
