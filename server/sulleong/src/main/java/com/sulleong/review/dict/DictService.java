package com.sulleong.review.dict;

import com.sulleong.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DictService {

    private final ReviewRepository reviewRepository;

    public void getDictList(Long memberId) {
        reviewRepository.findByMemberId(memberId).get().stream().forEach(a -> System.out.println(a.getId()));
    }
}
