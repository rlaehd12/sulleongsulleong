package com.sulleong.preference;

import com.sulleong.beer.Beer;
import com.sulleong.common.BaseTimeEntity;
import com.sulleong.member.Member;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Preference extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Beer beer;

    @Column(nullable = false)
    private Boolean choice;

    public boolean toggleChoice() {
        this.choice = !this.choice;
        return this.choice;
    }

    public Preference(Member member, Beer beer) {
        this.member = member;
        this.beer = beer;
        this.choice = true;
    }

    protected Preference() {
    }
}
