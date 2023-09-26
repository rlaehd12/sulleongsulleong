package com.sulleong.beer.detail.dto.response;

import com.sulleong.beer.Beer;
import com.sulleong.review.reads.dto.ReviewEntries;
import com.sulleong.review.reads.dto.ReviewEntry;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static com.sulleong.beer.BeerService.IMAGE_URL;

@Setter
@Getter
public class BeerDetailResponse {

    private String imageUrl;

    private String name;

    private String largeCategory;

    private String subCategory;

    private Double abv;

    private Boolean isPreference;

    private List<ReviewEntry> entries;

    public BeerDetailResponse(Beer beer, Boolean isPrefer, ReviewEntries entries) {
        this.imageUrl = IMAGE_URL + beer.getId();
        this.name = beer.getName();
        this.largeCategory = beer.getLargeCategory();
        this.subCategory = beer.getSubCategory();
        this.abv = beer.getAbv();
        this.isPreference = isPrefer;
        this.entries = entries.getEntries();
    }
}
