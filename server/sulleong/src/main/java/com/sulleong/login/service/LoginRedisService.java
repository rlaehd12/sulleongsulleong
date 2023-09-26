package com.sulleong.login.service;

import com.sulleong.login.dto.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class LoginRedisService {

    private final RedisTemplate<String, AuthMember> redisTemplate;

    private final int ACCESS_TOKEN_EXPIRE = 60 * 60 * 24; // 하루

    public String setAuthMember(AuthMember authMember) {
        String token = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(token, authMember, ACCESS_TOKEN_EXPIRE, TimeUnit.SECONDS);
        return token;
    }

    public void setGuestMember(String token, AuthMember authMember) {
        redisTemplate.opsForValue().set(token, authMember, ACCESS_TOKEN_EXPIRE, TimeUnit.SECONDS);
    }

    public AuthMember getAuthMember(String token) {
        redisTemplate.expire(token, ACCESS_TOKEN_EXPIRE, TimeUnit.SECONDS);
        return redisTemplate.opsForValue().get(token);
    }

    public void deleteAuthMember(String token) {
        redisTemplate.delete(token);
    }
}
