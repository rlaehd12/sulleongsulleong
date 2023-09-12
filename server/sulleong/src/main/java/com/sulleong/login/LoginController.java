package com.sulleong.login;

import com.sulleong.login.dto.AuthMember;
import com.sulleong.member.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class LoginController {

    private final RedisService redisService;
    private final OauthService oauthService;
    private final GuestService guestService;

    @Operation(summary = "구글 로그인", description = "로그인 생성시 세션 값을 헤더로 전송")
    @PostMapping("/oauth/login/google")
    public ResponseEntity<Void> google(@RequestBody Map<String, String> body) throws Exception {
        Member member = oauthService.getToken(body.get("code"));
        AuthMember authMember = new AuthMember(member);
        String token = UUID.randomUUID().toString();
        redisService.setAuthMember(token, authMember);

        HttpHeaders headers = new HttpHeaders();
        headers.add("authorization", token);
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    @Operation(summary = "익명 로그인", description = "실제 유저처럼 행동은 가능하지만 좋아요 클릭 불가")
    @GetMapping("/login/guest")
    public ResponseEntity<Void> guest() {
        String token = UUID.randomUUID().toString();
        Member member = guestService.saveOrUpdateGuest(token);
        AuthMember authMember = new AuthMember(member);
        redisService.setAuthMember(token, authMember);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token);
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
}