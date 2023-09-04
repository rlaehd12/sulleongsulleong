package com.sulleong.common;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Component
public class EnvLoader {

    @PostConstruct
    public void init() {
        try (InputStream input = new FileInputStream("src/main/resources/.env")) {
            Properties prop = new Properties();
            prop.load(input);
            prop.forEach((key, value) -> System.setProperty(key.toString(), value.toString()));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
