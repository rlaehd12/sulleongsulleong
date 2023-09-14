package com.sulleong.exception;

public class BeerChoiceNotEnoughException extends RuntimeException {
    public BeerChoiceNotEnoughException(String message) {
        super(message);
    }
}
