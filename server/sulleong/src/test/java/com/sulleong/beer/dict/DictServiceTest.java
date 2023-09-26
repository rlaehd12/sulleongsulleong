package com.sulleong.beer.dict;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class DictServiceTest {

    private final DictService dictService;

    @Autowired
    public DictServiceTest(DictService dictService) {
        this.dictService = dictService;
    }

    @Test
    public void getDictBeerListTest() {
        dictService.getDictBeerList().stream().forEach(a -> System.out.println(a.getName()));
    }

    @Test
    public void getDictListResponse() {
        long TestMemberId = 10009839;
        dictService.getDictListResponse(TestMemberId).getBeers().stream().forEach(System.out::println);
    }

    @Test
    public void getReviewCheck() {
        Assertions.assertThat(dictService.getReviewCheck(10009839L, 73158L)).isTrue();
    }
}