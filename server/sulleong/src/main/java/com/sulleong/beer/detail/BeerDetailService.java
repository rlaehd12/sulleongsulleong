package com.sulleong.beer.detail;

import com.sulleong.beer.Beer;
import com.sulleong.beer.BeerService;
import com.sulleong.beer.detail.dto.response.BeerDetailResponse;
import com.sulleong.preference.Preference;
import com.sulleong.preference.PreferenceService;
import com.sulleong.preference.total.TotalPreferenceService;
import com.sulleong.review.reads.ReviewReadsService;
import com.sulleong.review.reads.dto.ReviewEntries;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BeerDetailService {

    private final BeerService beerService;

    private final ReviewReadsService reviewReadsService;

    private final PreferenceService preferenceService;

    // Todo: 위에 preferenceService와 어떻게 나눌지 고민해봐야 할듯
    private final TotalPreferenceService totalPreferenceService;

    public BeerDetailResponse getDetail(Long beerId, Long memberId) {
        Beer beer = beerService.getBeerOrElseThrow(beerId);
        ReviewEntries reviewEntries = reviewReadsService.getRecentReviews(beerId);
        Boolean isPrefer = false;
        Optional<Preference> preference = preferenceService.findPreference(memberId, beerId);
        if (preference.isPresent() && preference.get().getChoice()) {
            isPrefer = true;
        }
        return BeerDetailResponse.builder()
                .beer(beer)
                .isPrefer(isPrefer)
                .preferCount(totalPreferenceService.getTotalPreference(beerId))
                .entries(reviewEntries)
                .build();
    }
}
