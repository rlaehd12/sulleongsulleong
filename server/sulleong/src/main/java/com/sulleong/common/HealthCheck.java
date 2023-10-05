package com.sulleong.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/api/health-check")
public class HealthCheck {

    @Value("${server-check}")
    private String check;

    @GetMapping
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok(check);
    }
}
