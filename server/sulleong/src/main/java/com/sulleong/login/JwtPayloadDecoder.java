package com.sulleong.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
public class JwtPayloadDecoder {

    public Map<String, String> decode(String jwt) {
        String[] splitToken = jwt.split("\\.");
        // 올바른 JWT인지 확인
        if (splitToken.length != 3) {
            throw new IllegalArgumentException("Invalid JWT token");
        }

        // Payload는 두 번째 부분
        String base64EncodedPayload = splitToken[1];

        // Base64Url 디코딩
        String payload = new String(Base64.getUrlDecoder().decode(base64EncodedPayload), StandardCharsets.UTF_8);

        try {
            // JSON 문자열을 Map으로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> payloadMap = objectMapper.readValue(payload, Map.class);

            // name과 email 값을 추출
            String name = payloadMap.get("name");
            String email = payloadMap.get("email");

            return payloadMap;
        } catch (Exception e) {
            throw new RuntimeException("Failed to decode payload", e);
        }
    }
}
