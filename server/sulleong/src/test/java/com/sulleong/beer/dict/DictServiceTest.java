package com.sulleong.beer.dict;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@Slf4j
class DictServiceTest {

    private final DictService dictService;

    @Autowired
    public DictServiceTest(DictService dictService) {
        this.dictService = dictService;
    }

    @Test
    public void 도감_갯수_체크() {
        long TestMemberId = 10009839;

        List<DictBeerEntry> beers = dictService.getDictListResponse(TestMemberId).getBeers();

        Assertions.assertThat(beers.size()).isEqualTo(118);
    }
}