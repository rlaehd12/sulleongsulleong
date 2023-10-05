package com.sulleong.beer.dto;

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
public class SurveyResponseEntry {

    private Long id;

    private String image;

    private String nameKor;

    public static SurveyResponseEntry create(Beer beer) {
        return SurveyResponseEntry.builder()
                .id(beer.getId())
                .image(ImageUri.URI.getValue() + beer.getId())
                .nameKor(beer.getNameKor())
                .build();
    }

}
