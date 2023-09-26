package com.sulleong.common;

public enum ImageUri {
    URI("https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_");

    private String value;

    private ImageUri(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
