package com.sulleong.login;

import com.sulleong.login.dto.AuthMember;
import com.sulleong.login.service.OauthService;
import com.sulleong.login.service.RedisService;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {

    private final RedisService redisService;
    private final MemberService memberService;
    private final OauthService oauthService;

    @Operation(summary = "구글 로그인", description = "로그인 생성시 세션 값을 헤더로 전송")
    @PostMapping("/oauth/login/google")
    public ResponseEntity<Void> google(@RequestBody Map<String, String> body) throws Exception {
        Map<String, String> userInfoMap = oauthService.getToken(body.get("code"));
        Member member = memberService.oauthSaveOrUpdate(userInfoMap.get("name"), userInfoMap.get("email"));
        AuthMember authMember = new AuthMember(member);
        String token = redisService.setAuthMember(authMember);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token);
        headers.add("Role", "USER");
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @Operation(summary = "익명 로그인", description = "실제 유저처럼 행동은 가능하지만 좋아요 클릭 불가")
    @GetMapping("/login/guest")
    public ResponseEntity<Void> guest() {
        Member member = memberService.guestSave();
        String token = member.getName();
        AuthMember authMember = new AuthMember(member);
        redisService.setGuestMember(token, authMember);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token);
        headers.add("Role", "GUEST");
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @Operation(summary = "로그아웃", description = "이 요청을 수행했다면, 서버 에러를 제외하고 모두 200 처리")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        redisService.deleteAuthMember(token);
        return ResponseEntity.ok().build();
    }
}