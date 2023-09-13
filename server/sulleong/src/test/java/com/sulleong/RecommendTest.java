package com.sulleong;

import com.sulleong.recommend.RecommendRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RecommendTest {

    @Autowired
    public RecommendRepository recommendRepository;

    @Test
    public void 리코맨드_아이디_테스트() {

    }
}
