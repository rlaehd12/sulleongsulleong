package com.sulleong.common;

import com.sulleong.exception.AgeRangeException;
import com.sulleong.exception.NotLoginException;
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
            AgeRangeException.class
    })
    public ResponseEntity<ErrorMessage> handleBadRequest(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({
            NotLoginException.class
    })
    public ResponseEntity<ErrorMessage> handleForBidden(Exception e, HttpServletRequest request) {
        return new ResponseEntity<>(buildErrorMessage(e, request),
                HttpStatus.FORBIDDEN);
    }
}
