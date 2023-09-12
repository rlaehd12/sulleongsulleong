package com.sulleong.beer;

import com.sulleong.beer.dto.SurveyResponse;
import com.sulleong.beer.dto.SearchParam;
import com.sulleong.beer.dto.SearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beers")
@RequiredArgsConstructor
public class BeerController {

    private final BeerService beerService;

    @Operation(summary = "맥주 선호도 조사", description = "선택한 맥주에 좋아요 추가 및 추천")
    @GetMapping("/survey")
    public ResponseEntity<SurveyResponse> getSurveyBeers() throws Exception {
        return ResponseEntity.ok(beerService.getSurveyBeers());
    }

    @Operation(summary = "맥주 검색", description = "입력한 내용을 포함하는 맥주 검색")
    @GetMapping("/search")
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
