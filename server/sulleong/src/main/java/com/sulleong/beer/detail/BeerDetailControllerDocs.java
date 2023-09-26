package com.sulleong.beer.detail;

import com.sulleong.beer.detail.dto.response.BeerDetailResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "맥주 상세 정보", description = "맥주 상세 정보 API")
public interface BeerDetailControllerDocs {

    @Operation(summary = "맥주 상세 정보",
            parameters = {
                    @Parameter(
                            in = ParameterIn.PATH,
                            name = "beerId",
                            required = true,
                            schema = @Schema(type = "integer"),
                            description = "맥주 ID"
                    ),
                    @Parameter(
                            in = ParameterIn.HEADER,
                            name = "Authorization",
                            required = true,
                            schema = @Schema(type = "string"),
                            description = "인증 토큰"
                    )
            },
            responses =
            @ApiResponse(responseCode = "200", description = "맥주 상세 정보 결과",
                    content =
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = BeerDetailResponse.class))
            )
    )
    BeerDetailResponse getBeerDetail(@PathVariable("beerId") Long beerId, HttpServletRequest request);
}
