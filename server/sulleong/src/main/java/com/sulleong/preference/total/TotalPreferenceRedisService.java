package com.sulleong.preference.total;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import static com.sulleong.preference.PreferenceService.DECREMENT_ONE;

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
        Integer total = redisTemplate.opsForValue().get(beerId);
        if (adjust == DECREMENT_ONE && total == 0) {
            return;
        }
        redisTemplate.opsForValue().increment(beerId, adjust);
    }
}
