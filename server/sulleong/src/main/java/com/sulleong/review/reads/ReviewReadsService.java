package com.sulleong.review.reads;

import com.sulleong.review.Review;
import com.sulleong.review.ReviewRepository;
import com.sulleong.review.reads.dto.ReviewEntries;
import com.sulleong.review.reads.dto.ReviewEntry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewReadsService {

    private final ReviewRepository reviewRepository;

    private final int REVIEW_SIZE = 5;

    public ReviewEntries getRecentReviews(Long beerId) {
        Pageable pageable = PageRequest.of(0, REVIEW_SIZE);
        List<Review> reviews = reviewRepository.findTop5ByBeerIdOrderByIdDesc(beerId, pageable);
        List<ReviewEntry> entries = new ArrayList<>();
        for (Review review : reviews) {
            entries.add(new ReviewEntry(review));
        }
        return new ReviewEntries(entries);
    }
}
