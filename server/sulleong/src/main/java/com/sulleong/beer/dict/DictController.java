package com.sulleong.beer.dict;

import com.sulleong.aop.LoginCheck;
import com.sulleong.login.dto.AuthMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/dict")
@RequiredArgsConstructor
@Slf4j
public class DictController implements DictControllerDocs {

    private final DictService dictService;

    @GetMapping
    @LoginCheck(type = LoginCheck.UserType.USER)
    public ResponseEntity<DictBeersResponse> getDict(HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        return ResponseEntity.ok(dictService.getDictListResponse(authMember.getId()));
    }

//    @GetMapping("/test/{userId}")
//    public ResponseEntity<DictBeersResponse> getDict(@PathVariable("userId") Long userId) {
//        return ResponseEntity.ok(dictService.getDictListResponse(userId));
//    }
}
