package com.sulleong.beer.dict;

import com.sulleong.beer.Beer;
import com.sulleong.common.ImageUri;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class DictBeerEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long beer_id;

    private String image;

    private String largeCategory;

    private boolean dictCheck;

    private String name;

    public static DictBeerEntry createDictBeer(Beer beer, boolean check) {
        return DictBeerEntry.builder()
                .beer_id(beer.getId())
                .image(ImageUri.URI.getValue() + beer.getId())
                .dictCheck(check)
                .name(beer.getNameKor())
                .largeCategory(beer.getLargeCategory())
                .build();
    }
}
