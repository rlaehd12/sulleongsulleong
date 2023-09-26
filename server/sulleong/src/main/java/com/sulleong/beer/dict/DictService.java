package com.sulleong.beer.dict;

import com.sulleong.beer.Beer;
import com.sulleong.beer.repository.BeerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictService {

    private final BeerRepository beerRepository;

    public DictBeersResponse getDictListResponse(Long memberId) {

        List<Beer> existList = beerRepository.getDictBeerByMemberid(memberId);
        List<Beer> dictBeer = getDictBeerList();
        List<Long> existIds = existList.stream().map(beer -> beer.getId()).collect(Collectors.toList());

        List<DictBeerEntry> beers = dictBeer.stream()
                .map(beer -> DictBeerEntry.createDictBeer(beer, getReviewCheck(beer, existIds)))
                .collect(Collectors.toList());

        return DictBeersResponse.createResponse(beers, existList.size());
    }

    private boolean getReviewCheck(Beer beer, List<Long> existIds) {
        return existIds.contains(beer.getId());
    }


    private List<Beer> getDictBeerList() {
        return beerRepository.getDictBeers();
    }
}
