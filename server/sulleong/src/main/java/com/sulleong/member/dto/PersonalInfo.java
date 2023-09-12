package com.sulleong.member.dto;

import com.sulleong.member.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PersonalInfo {

    private Integer age;

    private Gender gender;

}
