package com.sulleong.member;

import com.sulleong.exception.AgeRangeException;
import com.sulleong.exception.NotLoginException;
import com.sulleong.login.RequireAuth;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.member.dto.AgeParam;
import com.sulleong.member.dto.GenderParam;
import com.sulleong.member.dto.PersonalInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 테스트용으로 만든 코드.
     * 프론트와 통신이 되는 것이 확인되면 삭제
     */
    @RequireAuth
    @GetMapping("/test")
    public ResponseEntity<Void> test(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        if (authMember == null) {
            throw new NotLoginException("로그인하지 않은 사용자입니다.");
        }
        System.out.println(authMember.getId());
        System.out.println(authMember.getName());
        System.out.println(authMember.getRole());
        return ResponseEntity.ok().build();
    }

    @RequireAuth
    @GetMapping("/info")
    public ResponseEntity<PersonalInfo> getPersonalInfo(HttpServletRequest request) throws Exception {
//        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = 3L;
        PersonalInfo personalInfo = memberService.getPersonalInfo(memberId);
        return ResponseEntity.ok(personalInfo);
    }

    @RequireAuth
    @PatchMapping("/age")
    public ResponseEntity<Integer> modifyAge(HttpServletRequest request, @ModelAttribute AgeParam param) throws Exception {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        Integer age = param.getValue();
        if (age == 20 || age == 30 || age == 40 || age == 50 || age == 60) {
            memberService.modifyAge(memberId, age);
            return ResponseEntity.ok(age);
        } else {
            throw new AgeRangeException("유효하지 않은 연령대 입니다.");
        }
    }

    @RequireAuth
    @PatchMapping("/gender")
    public ResponseEntity<Gender> modifyGender(HttpServletRequest request, @ModelAttribute GenderParam param) throws Exception {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = 3L;
        Gender gender = param.getValue();
        memberService.modifyGender(memberId, gender);
        return ResponseEntity.ok(gender);
    }

}
