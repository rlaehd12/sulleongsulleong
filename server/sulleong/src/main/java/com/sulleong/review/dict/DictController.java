package com.sulleong.review.dict;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/dict")
@RequiredArgsConstructor
public class DictController {

    private final DictService dictService;

    @GetMapping
    @LoginCheck(type = LoginCheck.UserType.USER)
    public String getDict(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        dictService.getDictList(authMember.getId());
        return "";
    }

}
