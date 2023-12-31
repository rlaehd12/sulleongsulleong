package com.sulleong.preference;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    List<Preference> findByMemberId(Long memberId);

    Optional<Preference> findByMemberIdAndBeerId(Long memberId, Long beerId);

    int countByBeerId(@Param("beerId") Long beerId);
}
