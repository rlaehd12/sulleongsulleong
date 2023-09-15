package com.sulleong.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulleong.exception.InvalidOAuthResponseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Slf4j
@Component
public class JwtPayloadDecoder {

    public Map<String, String> decode(String jwt) {

        String base64EncodedPayload = parsePayload(jwt);
        String base64DecodedPayload = Base64Decode(base64EncodedPayload);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> payloadMap = objectMapper.readValue(base64DecodedPayload, Map.class);

            String name = payloadMap.get("name");
            String email = payloadMap.get("email");

            return payloadMap;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new InvalidOAuthResponseException("payload mapper can't parse");
        }
    }

    private String parsePayload(String jwt) {
        String[] splitToken = jwt.split("\\.");
        // 올바른 JWT인지 확인
        if (splitToken.length != 3) {
            throw new InvalidOAuthResponseException("response body is not jwt");
        }
        // Payload는 두 번째 부분
        return splitToken[1];
    }

    private String Base64Decode(String base64EncodedPayload) {
        return new String(Base64.getUrlDecoder().decode(base64EncodedPayload), StandardCharsets.UTF_8);
    }
}
