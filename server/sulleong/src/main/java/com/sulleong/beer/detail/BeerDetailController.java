package com.sulleong.beer.detail;

import com.sulleong.aop.LoginCheck;
import com.sulleong.beer.detail.dto.response.BeerDetailResponse;
import com.sulleong.login.dto.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/beers")
@RequiredArgsConstructor
public class BeerDetailController implements BeerDetailControllerDocs {

    private final BeerDetailService beerDetailService;

    @Override
    @LoginCheck(type = LoginCheck.UserType.GUEST)
    @GetMapping("/{beerId}")
    public BeerDetailResponse getBeerDetail(@PathVariable("beerId") Long beerId, HttpServletRequest request) {
        AuthMember authMember = (AuthMember) request.getAttribute("authMember");
        return beerDetailService.getDetail(beerId, authMember.getId());
    }
}
