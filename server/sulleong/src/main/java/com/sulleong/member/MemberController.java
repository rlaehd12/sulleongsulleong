package com.sulleong.member;

import com.sulleong.exception.InvalidAgeException;
import com.sulleong.exception.InvalidGenderException;
import com.sulleong.exception.NotLoginException;
import com.sulleong.login.RequireAuth;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.member.dto.AgeParam;
import com.sulleong.member.dto.GenderParam;
import com.sulleong.member.dto.PersonalInfo;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "회원 개인 정보", description = "선호도 설문 시 회원의 개인 정보를 가져오는 작업")
    public ResponseEntity<PersonalInfo> getPersonalInfo(HttpServletRequest request) throws Exception {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        PersonalInfo personalInfo = memberService.getPersonalInfo(authMember.getId());
        return ResponseEntity.ok(personalInfo);
    }

    @RequireAuth
    @PatchMapping("/age")
    @Operation(summary = "회원 연령대 수정", description = "선호도 설문 시 회원의 연령대를 수정하는 작업")
    public ResponseEntity<Integer> modifyAge(HttpServletRequest request, @ModelAttribute AgeParam param) throws Exception {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        Long memberId = authMember.getId();
        Integer age = param.getValue();
        if (age == 20 || age == 30 || age == 40 || age == 50 || age == 60) {
            memberService.modifyAge(memberId, age);
            return ResponseEntity.ok(age);
        } else {
            throw new InvalidAgeException("유효하지 않은 연령대 입니다.");
        }
    }

//    @RequireAuth
    @PatchMapping("/gender")
    @Operation(summary = "회원 성별 수정", description = "선호도 설문 시 회원의 성별을 수정하는 작업")
    public ResponseEntity<String> modifyGender(HttpServletRequest request, @ModelAttribute GenderParam param) throws Exception {
//        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
//        Long memberId = authMember.getId();
        Long memberId = 7L;
        String gender = param.getValue();
        if (gender.equals("M") || gender.equals("F")) {
            memberService.modifyGender(memberId, gender);
            return ResponseEntity.ok(gender);
        } else {
            throw new InvalidGenderException("유효하지 않은 성별입니다.");
        }
    }

}
