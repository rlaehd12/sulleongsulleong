package com.sulleong.beer.detail.dto.response;

import com.sulleong.beer.Beer;
import com.sulleong.common.ImageUri;
import com.sulleong.review.reads.dto.ReviewEntries;
import com.sulleong.review.reads.dto.ReviewEntry;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class BeerDetailResponse {

    private String imageUrl;

    private String name;

    private String largeCategory;

    private String subCategory;

    private Double abv;

    private Boolean isPreference;

    private Integer preferCount;

    private List<ReviewEntry> entries;

    @Builder
    public BeerDetailResponse(Beer beer, Boolean isPrefer, Integer preferCount, ReviewEntries entries) {
        this.imageUrl = ImageUri.URI.getValue() + beer.getId();
        this.name = beer.getName();
        this.largeCategory = beer.getLargeCategory();
        this.subCategory = beer.getSubCategory();
        this.abv = beer.getAbv();
        this.isPreference = isPrefer;
        this.preferCount = preferCount;
        this.entries = entries.getEntries();
    }
}
