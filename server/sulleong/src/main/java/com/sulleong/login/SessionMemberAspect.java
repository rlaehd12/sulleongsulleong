package com.sulleong.login;

import com.sulleong.login.dto.SessionMember;
import com.sulleong.member.MemberService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Aspect
@Component
public class SessionMemberAspect {

    @Autowired
    private MemberService memberService;

    @Before("@annotation(RequireSessionMember)")
    public void handleSessionMember(JoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = sra.getRequest();

        HttpSession session = request.getSession();
        String sessionId = request.getHeader("Authorization");
        SessionMember sessionMember = (SessionMember) session.getAttribute(sessionId);
        request.setAttribute("sessionMember", sessionMember);
    }

}
