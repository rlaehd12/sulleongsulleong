package com.sulleong.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins("*") // 모든 출처 허용
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE") // 모든 HTTP 메소드 허용
                .allowedHeaders("*") // 모든 헤더 허용
                .exposedHeaders("authorization")
                .exposedHeaders("role")
                .maxAge(3600); // 캐시 유지 시간 설정
    }
}