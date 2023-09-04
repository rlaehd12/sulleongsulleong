package com.sulleong.preference;

import com.sulleong.login.RequireSessionMember;
import com.sulleong.login.dto.SessionMember;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/api/beers/preference")
@RestController
public class PreferenceController {

    private final PreferenceService preferenceService;

    @Operation(summary = "좋아요 클릭", description = "좋아요/취소에 대한 작업")
    @RequireSessionMember
    @PostMapping("/{beerId}")
    public ResponseEntity<Void> clickPrefer(HttpServletRequest request, @PathVariable("beerId") Long beerId) {
        SessionMember sessionMember = (SessionMember) request.getAttribute("sessionMember");
        preferenceService.setPreference(sessionMember.getId(), beerId);
        return ResponseEntity.ok().build();
    }
}
