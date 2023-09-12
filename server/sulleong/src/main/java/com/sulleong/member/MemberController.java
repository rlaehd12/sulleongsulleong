package com.sulleong.member;

import com.sulleong.exception.AgeRangeException;
import com.sulleong.exception.NotLoginException;
import com.sulleong.login.RequireSessionMember;
import com.sulleong.login.dto.SessionMember;
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

    @RequireSessionMember
    @GetMapping("/info")
    public ResponseEntity<PersonalInfo> getPersonalInfo(HttpServletRequest request) throws Exception {
//        SessionMember sessionMember = (SessionMember) request.getAttribute("sessionMember");
        Long memberId = 3L;
        PersonalInfo personalInfo = memberService.getPersonalInfo(memberId);
        return ResponseEntity.ok(personalInfo);
    }

    @RequireSessionMember
    @PatchMapping("/age")
    public ResponseEntity<Integer> modifyAge(HttpServletRequest request, @ModelAttribute AgeParam param) throws Exception {
        SessionMember sessionMember = (SessionMember) request.getAttribute("sessionMember");
        Long memberId = sessionMember.getId();
        Integer age = param.getValue();
        if (age == 20 || age == 30 || age == 40 || age == 50 || age == 60) {
            memberService.modifyAge(memberId, age);
            return ResponseEntity.ok(age);
        } else {
            throw new AgeRangeException("유효하지 않은 연령대 입니다.");
        }
    }

    @RequireSessionMember
    @PatchMapping("/gender")
    public ResponseEntity<Gender> modifyGender(HttpServletRequest request, @ModelAttribute GenderParam param) throws Exception {
        SessionMember sessionMember = (SessionMember) request.getAttribute("sessionMember");
        Long memberId = 3L;
        Gender gender = param.getValue();
        memberService.modifyGender(memberId, gender);
        return ResponseEntity.ok(gender);
    }

}
