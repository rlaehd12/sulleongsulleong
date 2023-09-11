package com.sulleong.login;

import com.sulleong.login.dto.SessionMember;
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
public class SessionMemberAspect {

    @Autowired
    private RedisService redisService;


    @Before("@annotation(RequireSessionMember)")
    public void handleSessionMember(JoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = sra.getRequest();

        String sessionId = request.getHeader("Authorization");
        SessionMember sessionMember = redisService.getSessionMember(sessionId);
        if (sessionMember == null) {
            throw new IllegalArgumentException("SessionMember is not found");
        }
        request.setAttribute("sessionMember", sessionMember);
    }
}
