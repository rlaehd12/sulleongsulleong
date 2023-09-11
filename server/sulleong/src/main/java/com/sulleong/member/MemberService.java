package com.sulleong.member;

import com.sulleong.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member OauthSaveOrUpdate(String name, String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isEmpty()) {
            return memberRepository.save(new Member(name, email, Role.USER));
        }

        Member existingMember = optionalMember.get();
        existingMember.setUpdatedAt();
        return existingMember;
    }

    public Member getMemberOrElseThrow(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("존재하지 않은 회원 ID: " + memberId));
    }
}