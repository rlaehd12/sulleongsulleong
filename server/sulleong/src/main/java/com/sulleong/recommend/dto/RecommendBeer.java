package com.sulleong.recommend.dto;

import com.sulleong.beer.Beer;
import com.sulleong.common.ImageUri;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendBeer {

    private Long id;

    private String image;

    private String name;

    public static RecommendBeer create(Beer beer) {
        return RecommendBeer.builder()
                .id(beer.getId())
                .image(ImageUri.URI.getValue() + beer.getId())
                .name(beer.getName())
                .build();
    }

}
