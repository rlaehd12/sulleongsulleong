package com.sulleong.preference;

import com.sulleong.beer.dto.SurveyParam;
import com.sulleong.login.RequireAuth;
import com.sulleong.login.dto.AuthMember;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/beers/preference")
@RestController
public class PreferenceController {

    private final PreferenceService preferenceService;

    @RequireAuth
    @PostMapping("/{beerId}")
    @Operation(summary = "맥주 좋아요 클릭", description = "좋아요/취소에 대한 작업")
    public ResponseEntity<Void> clickPrefer(HttpServletRequest request, @PathVariable("beerId") Long beerId) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        preferenceService.setPreference(authMember.getId(), beerId);
        return ResponseEntity.ok().build();
    }

    @RequireAuth
    @PostMapping("/survey")
    @Operation(summary = "맥주 설문 제출", description = "좋아요 초기 설정에 대한 작업")
    public ResponseEntity<Void> submitSurvey(HttpServletRequest request, @ModelAttribute SurveyParam param) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        List<Long> beerIds = param.getBeers();
        preferenceService.cancelAllPreferences(memberId);
        for (Long beerId : beerIds) {
            preferenceService.setPreference(memberId, beerId);
        }
        return ResponseEntity.ok().build();
    }

}
