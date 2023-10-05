package com.sulleong.preference.total;

import com.sulleong.preference.Preference;
import com.sulleong.preference.PreferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TotalPreferenceService {

    private final PreferenceRepository repository;

    private final TotalPreferenceRedisService redisService;

    public int getTotalPreference(long beerId) {
        checkRedisExist(beerId);
        return redisService.getTotal(beerId);
    }

    public int adjustPreference(long beerId, int adjust) {
        checkRedisExist(beerId);
        redisService.adjustPreference(beerId, adjust);
        return redisService.getTotal(beerId);
    }

    private void checkRedisExist(long beerId) {
        Integer total = redisService.getTotal(beerId);
        if (total == null) {
            int count = repository.countByBeerId(beerId);
            redisService.setTotal(beerId, count);
        }
    }

    public boolean isMemberLikeBeer(Long memberId, Long beerId) {
        Optional<Preference> preference = repository.findByMemberIdAndBeerId(memberId, beerId);
        if (preference.isEmpty()) {
            return false;
        }
        return preference.get().getChoice();
    }
}
