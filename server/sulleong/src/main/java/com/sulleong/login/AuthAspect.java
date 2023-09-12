package com.sulleong.login;

import com.sulleong.exception.AccessTokenExpiredException;
import com.sulleong.login.dto.AuthMember;
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
public class AuthAspect {

    @Autowired
    private RedisService redisService;

    @Before("@annotation(RequireAuth)")
    public void handleAuth(JoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = sra.getRequest();

        String token = request.getHeader("Authorization");
        AuthMember authMember = redisService.getAuthMember(token);
        if (authMember == null) {
            throw new AccessTokenExpiredException();
        }
        request.setAttribute("authMember", authMember);
    }
}
