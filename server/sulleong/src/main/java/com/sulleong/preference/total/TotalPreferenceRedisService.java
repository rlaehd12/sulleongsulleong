package com.sulleong.preference.total;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class TotalPreferenceRedisService {

    private final RedisTemplate<Long, Integer> redisTemplate;

    public Integer getTotal(Long beerId) {
        return redisTemplate.opsForValue().get(beerId);
    }

    public void setTotal(Long beerId, int total) {
        redisTemplate.opsForValue().set(beerId, total);
    }

    public void adjustPreference(Long beerId, int adjust) {
        redisTemplate.opsForValue().increment(beerId, adjust);
    }
}
