package com.sulleong.member;

import com.sulleong.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member OauthSaveOrUpdate(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Member member = Member.builder()
                .email((String)attributes.get("email"))
                .name((String)attributes.get("name"))
                .role(Role.USER)
                .build();
        return memberRepository.save(member);
    }

    public Member getMemberOrElseThrow(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("존재하지 않은 회원 ID: " + memberId));
    }

    @Transactional
    public Member loginTimeUpdate(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException("존재하지 않는 이메일: " + email));
        member.setUpdatedAt();
        return memberRepository.save(member);
    }

}