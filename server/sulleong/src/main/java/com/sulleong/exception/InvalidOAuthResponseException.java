package com.sulleong.exception;

public class InvalidOAuthResponseException extends RuntimeException {
    public InvalidOAuthResponseException(String message) {
        super(message);
    }
}
