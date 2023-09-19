package com.sulleong.aop;

import com.sulleong.exception.AccessTokenExpiredException;
import com.sulleong.exception.GuestNotAllowException;
import com.sulleong.login.service.RedisService;
import com.sulleong.login.dto.AuthMember;
import com.sulleong.member.Role;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class AuthCheckAspect {

    @Autowired
    private RedisService redisService;

    @Before("@annotation(com.sulleong.aop.LoginCheck) && @ annotation(loginCheck)")
    public void loginCheck(JoinPoint joinPoint, LoginCheck loginCheck) throws Throwable {
        HttpServletRequest request = getHttpServletRequest();
        String token = getTokenOrElseThrow(request);
        AuthMember authMember = getAuthMemberOrElseThrow(token);
        LoginCheck.UserType requiredType = loginCheck.type();

        if (!isAccessAllowed(requiredType, authMember)) {
            throw new GuestNotAllowException("로그인한 사용자만 이용 가능합니다.");
        }

        request.setAttribute("authMember", authMember);
    }

    private HttpServletRequest getHttpServletRequest() {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return sra.getRequest();
    }

    private String getTokenOrElseThrow(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null) {
            throw new AccessTokenExpiredException("인증 토큰이 없습니다.");
        }
        return token;
    }

    private AuthMember getAuthMemberOrElseThrow(String token) {
        AuthMember authMember = redisService.getAuthMember(token);
        if (authMember == null) {
            throw new AccessTokenExpiredException("인증이 만료된 사용자입니다.");
        }
        return authMember;
    }

    private boolean isAccessAllowed(LoginCheck.UserType requiredType, AuthMember authMember) {
        // USER만 접근 가능한 API면 GUEST는 접근 불가
        if (requiredType.equals(LoginCheck.UserType.USER)) {
            return authMember.getRole().equals(Role.USER);
        }
        return true;
    }

}
