package com.sulleong.member;

import com.sulleong.exception.MemberNotFoundException;
import com.sulleong.login.dto.CredentialRequest;
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
    public Member OauthSaveOrUpdate(CredentialRequest credentialRequest) {
        String userEmail = credentialRequest.getEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(userEmail);

        if (optionalMember.isEmpty()) {
            return memberRepository.save(credentialRequest.dtoToEntity());
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