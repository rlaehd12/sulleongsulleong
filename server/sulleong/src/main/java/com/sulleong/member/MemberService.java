package com.sulleong.member;

import com.sulleong.exception.MemberNotFoundException;
import com.sulleong.member.dto.PersonalInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public Member oauthSaveOrUpdate(String name, String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isEmpty()) {
            return memberRepository.save(new Member(name, email, Role.USER));
        }

        Member existingMember = optionalMember.get();
        existingMember.setUpdatedAt();
        return existingMember;
    }

    @Transactional
    public Member guestSave() {
        String token = UUID.randomUUID().toString();
        Member member = Member.builder()
                .name(token)
                .email(token + "@guest.com")
                .role(Role.GUEST)
                .build();
        return memberRepository.save(member);
    }

    /**
     * 회원의 연령대 및 성별 정보를 가져옵니다.
     */
    public PersonalInfo getPersonalInfo(Long memberId) throws Exception {
        Member member = getMemberOrElseThrow(memberId);
        Integer age = member.getAge();
        String gender = member.getGender();
        return new PersonalInfo(age, gender);
    }

    /**
     * 회원의 연령대를 업데이트 합니다.
     */
    @Transactional
    public void modifyAge(Long memberId, Integer age) throws Exception {
        Member member = getMemberOrElseThrow(memberId);
        member.setAge(age);
    }

    /**
     * 회원의 성별을 업데이트 합니다.
     */
    @Transactional
    public void modifyGender(Long memberId, String gender) throws Exception {
        Member member = getMemberOrElseThrow(memberId);
        member.setGender(gender);
    }

    /**
     * 회원 정보를 가져옵니다.
     */
    public Member getMemberOrElseThrow(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("존재하지 않은 회원 ID: " + memberId));
    }
}