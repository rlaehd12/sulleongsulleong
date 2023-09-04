package com.sulleong.login.dto;

import com.sulleong.member.Member;
import com.sulleong.member.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SessionMember {

    private Long id;

    private String name;

    private String email;

    private Role role;

    public SessionMember(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.email = member.getEmail();
        this.role = member.getRole();
    }
}
