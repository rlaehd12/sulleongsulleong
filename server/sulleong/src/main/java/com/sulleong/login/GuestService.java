package com.sulleong.login;

import com.sulleong.member.Member;
import com.sulleong.member.MemberRepository;
import com.sulleong.member.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GuestService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member saveOrUpdateGuest(String sessionId) {
        Optional<Member> optionalPreference = findGuest(sessionId);
        return optionalPreference.map(member -> guestUpdate(member))
                .orElseGet(() -> guestSave(sessionId));
    }

    private Optional<Member> findGuest(String uuid) {
        return memberRepository.findByName(uuid);
    }

    private Member guestUpdate(Member member) {
        member.setUpdatedAt();
        return memberRepository.save(member);
    }

    private Member guestSave(String uuid) {
        Member member = Member.builder()
                .name(uuid)
                .email(uuid + "@guest.com")
                .role(Role.GUEST)
                .build();
        return memberRepository.save(member);
    }
}