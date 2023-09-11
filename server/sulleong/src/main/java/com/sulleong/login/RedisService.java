package com.sulleong.login;

import com.sulleong.login.dto.SessionMember;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisService {

    private final RedisTemplate<String, SessionMember> redisTemplate;

    public void setSessionMember(String sessionId, SessionMember sessionMember) {
        redisTemplate.opsForValue().set(sessionId, sessionMember);
    }

    public SessionMember getSessionMember(String sessionId) {
        return redisTemplate.opsForValue().get(sessionId);
    }
}
