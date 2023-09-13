package com.sulleong.exception;

public class GuestNotAllowException extends RuntimeException {
    public GuestNotAllowException(String message) {
        super(message);
    }
}
