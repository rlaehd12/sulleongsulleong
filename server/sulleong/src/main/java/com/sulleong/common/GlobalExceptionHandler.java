package com.sulleong.common;

import com.sulleong.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private ErrorMessage buildErrorMessage(Exception exception, HttpServletRequest request) {
        log.error(exception.getMessage());
        return ErrorMessage.builder()
                .title(exception.getClass().getSimpleName())
                .detail(exception.getMessage())
                .instance(request.getRequestURI())
                .build();
    }

    @ExceptionHandler({
            InvalidAgeException.class,
            InvalidGenderException.class,
            BeerChoiceNotEnoughException.class
    })
    public ResponseEntity<ErrorMessage> handleBadRequest(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            GuestNotAllowException.class,
            NotLoginException.class,
            AccessTokenExpiredException.class,
    })
    public ResponseEntity<ErrorMessage> handleUnAuthorized(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({
            BeerNotFoundException.class,
            MemberNotFoundException.class
    })
    public ResponseEntity<ErrorMessage> handleNotFound(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            GoogleOauthLoginException.class,
            InvalidOAuthResponseException.class
    })
    public ResponseEntity<ErrorMessage> handleOauthException(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
