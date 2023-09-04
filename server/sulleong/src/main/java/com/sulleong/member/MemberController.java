package com.sulleong.member;

import com.sulleong.exception.NotLoginException;
import com.sulleong.login.RequireSessionMember;
import com.sulleong.login.dto.SessionMember;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/api/members")
@RestController
public class MemberController {

    /**
     * 테스트용으로 만든 코드.
     * 프론트와 통신이 되는 것이 확인되면 삭제
     */
    @RequireSessionMember
    @GetMapping("/test")
    public ResponseEntity<Void> test(HttpServletRequest request) {
        SessionMember sessionMember = (SessionMember) request.getAttribute("sessionMember");
        if (sessionMember == null) {
            throw new NotLoginException("로그인하지 않은 사용자입니다.");
        }
        System.out.println(sessionMember.getId());
        System.out.println(sessionMember.getName());
        System.out.println(sessionMember.getRole());
        return ResponseEntity.ok().build();
    }
}
