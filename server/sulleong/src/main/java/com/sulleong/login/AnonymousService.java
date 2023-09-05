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
public class AnonymousService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member saveOrUpdateAnonymous(String uuid) {
        Optional<Member> optionalPreference = findAnonymous(uuid);
        return optionalPreference.map(member -> anonymousUpdate(member))
                .orElseGet(() -> anonymousSave(uuid));
    }

    private Optional<Member> findAnonymous(String uuid) {
        return memberRepository.findByName(uuid);
    }

    private Member anonymousUpdate(Member member) {
        member.setUpdatedAt();
        return memberRepository.save(member);
    }

    private Member anonymousSave(String uuid) {
        Member member = Member.builder()
                .name(uuid)
                .email("anonymous@email.com")
                .role(Role.ANONYMOUS)
                .build();
        return memberRepository.save(member);
    }
}