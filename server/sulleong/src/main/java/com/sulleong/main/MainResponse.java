package com.sulleong.main;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainResponse {

    private String memberName;

    private List<TodayBeer> todayBeers;

}
