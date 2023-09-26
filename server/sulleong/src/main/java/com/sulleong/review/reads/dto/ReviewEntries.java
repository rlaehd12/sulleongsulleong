package com.sulleong.review.reads.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ReviewEntries {

    private List<ReviewEntry> entries;

    public ReviewEntries(List<ReviewEntry> entries) {
        this.entries = entries;
    }
}
