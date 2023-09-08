package com.sulleong.login.dto;

import com.sulleong.member.Member;
import com.sulleong.member.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CredentialRequest {

    private String name;

    private String email;

    public CredentialRequest(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Member dtoToEntity() {
        return Member.builder()
                .name(name)
                .email(email)
                .role(Role.USER)
                .build();
    }
}
