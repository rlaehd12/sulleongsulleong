package com.sulleong.beer.dict;

import com.sulleong.review.create.controller.dto.request.BeerReviewCreateForm;
import com.sulleong.review.create.controller.dto.response.BeerReviewCreateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "맥주 도감 리스트 조회", description = "맥주 도감 리스트를 가져오는 api")
public interface DictControllerDocs {

    @Operation(summary = "도감 목록 조회",
            parameters = {
                    @Parameter(
                            in = ParameterIn.HEADER,
                            name = "Authorization",
                            required = true,
                            schema = @Schema(type = "string"),
                            description = "인증 토큰"
                    )
            },
            responses =
            @ApiResponse(responseCode = "200", description = "맥주 도감 목록",
                    content =
                    @Content(mediaType="application/json",
                            schema=@Schema(implementation=DictBeersResponse.class))
            )
    )
    ResponseEntity<DictBeersResponse> getDict(
            HttpServletRequest request
    );
}
