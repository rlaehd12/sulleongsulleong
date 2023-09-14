package com.sulleong.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulleong.exception.GoogleOauthLoginException;
import com.sulleong.login.dto.TokenResponse;
import com.sulleong.member.Member;
import com.sulleong.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class OauthService {

    private final String GOOGLE_OAUTH_URL = "https://oauth2.googleapis.com/token";
    private final String CLIENT_ID = "681159939854-mbkio13ft80rtf962te4vj5ni8mhgh1c.apps.googleusercontent.com";
    private final String CLIENT_SECRET = "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";
    private final String REDIRECT_URI = "https://sulleong.site/login/google";

    private final MemberService memberService;
    private final JwtPayloadDecoder jwtPayloadDecoder;

    public Member getToken(String code) throws Exception {
        URL url = new URL(GOOGLE_OAUTH_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setDoOutput(true);

        String params = String.format("code=%s&client_id=%s&client_secret=%s&redirect_uri=%s&grant_type=authorization_code",
                code, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = params.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            ObjectMapper mapper = new ObjectMapper();
            TokenResponse tokenResponse = mapper.readValue(br, TokenResponse.class);

            Map<String, String> userInfoMap = jwtPayloadDecoder.decode(tokenResponse.getId_token());
            return memberService.OauthSaveOrUpdate(userInfoMap.get("name"), userInfoMap.get("email"));
        } else {
            BufferedReader errorBr = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            StringBuilder errorMessage = new StringBuilder();
            String line;
            while ((line = errorBr.readLine()) != null) {
                errorMessage.append(line).append('\n');
            }
            System.out.println("Error response: " + errorMessage.toString());
            throw new GoogleOauthLoginException("");
        }
    }
}
