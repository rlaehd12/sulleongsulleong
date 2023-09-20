package com.sulleong.login.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulleong.exception.GoogleOauthLoginException;
import com.sulleong.exception.OauthConnectionException;
import com.sulleong.login.JwtPayloadDecoder;
import com.sulleong.login.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class OauthService {

    private final String GOOGLE_OAUTH_URL = "https://oauth2.googleapis.com/token";
    private final String CLIENT_ID = "681159939854-mbkio13ft80rtf962te4vj5ni8mhgh1c.apps.googleusercontent.com";
    private final String CLIENT_SECRET = "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";
    private final String REDIRECT_URI = "https://dev.sulleong.site/login/google";

    private final JwtPayloadDecoder jwtPayloadDecoder;

    public Map<String, String> getToken(String code) throws Exception {
        HttpURLConnection connection = makeHttpURLConnection();
        accessAPIServer(connection, code);
        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            parseErrorResponse(connection);
        }
        return parseSuccessResponse(connection);
    }

    private HttpURLConnection makeHttpURLConnection() {
        HttpURLConnection connection;
        try {
            URL url = new URL(GOOGLE_OAUTH_URL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setDoOutput(true);
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new OauthConnectionException("HttpURLConnection을 생성할 수 없습니다.");
        }
        return connection;
    }

    private void accessAPIServer(HttpURLConnection connection, String code) {
        String params = String.format("code=%s&client_id=%s&client_secret=%s&redirect_uri=%s&grant_type=authorization_code",
                code, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = params.getBytes("utf-8");
            os.write(input, 0, input.length);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private Map<String, String> parseSuccessResponse(HttpURLConnection connection) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            ObjectMapper mapper = new ObjectMapper();
            TokenResponse tokenResponse = mapper.readValue(br, TokenResponse.class);
            return jwtPayloadDecoder.decode(tokenResponse.getId_token());
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new OauthConnectionException("response 파싱 에러");
        }
    }

    private void parseErrorResponse(HttpURLConnection connection) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getErrorStream()))) {
            StringBuilder errorMessage = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                errorMessage.append(line).append('\n');
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        } finally {
            throw new GoogleOauthLoginException("구글 로그인 오류");
        }
    }
}
