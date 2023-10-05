package com.sulleong.member;

import com.sulleong.common.BaseTimeEntity;
import com.sulleong.preference.Preference;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_sequence_generator")
    @SequenceGenerator(name = "member_sequence_generator", sequenceName = "member_sequence", allocationSize = 1)
    private Long id;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Preference> preferences;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private Integer age;

    private String gender;

    @Builder
    public Member(String name, String email, Role role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    protected Member() {
    }
}
