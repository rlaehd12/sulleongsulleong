package com.sulleong.common;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

// https://datatracker.ietf.org/doc/html/rfc7807
@Data
@Builder
public class ErrorMessage {

    private String title;       // "You do not have enough credit.",
    private String detail;      // "Your current balance is 30, but that costs 50.",
    private String instance;    // /account/12345/msgs/abc",
}
