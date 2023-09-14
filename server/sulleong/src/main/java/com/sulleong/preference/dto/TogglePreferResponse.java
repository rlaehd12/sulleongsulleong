package com.sulleong.preference.dto;

import com.sulleong.preference.Preference;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TogglePreferResponse {

    private Long memberId;

    private Long beerId;

    private Boolean result;

    private Integer like = 0;

    public TogglePreferResponse(Preference preference) {
        this.memberId = preference.getMember().getId();
        this.beerId = preference.getBeer().getId();
        this.result = preference.getChoice();
    }
}
