package com.sulleong.review.create.controller;

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

import javax.servlet.http.HttpServletRequest;

@Tag(name = "맥주 리뷰 생성", description = "맥주 리뷰를 생성하는 API")
public interface ReviewCreateControllerDocs {

    @Operation(summary = "맥주 리뷰 생성",
            parameters = {
                    @Parameter(
                            in = ParameterIn.HEADER,
                            name = "Authorization",
                            required = true,
                            schema = @Schema(type = "string"),
                            description = "인증 토큰"
                    )
            },
            requestBody =
            @RequestBody(description = "등록할 맥주 리뷰 정보",
                    content =
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = BeerReviewCreateForm.class))
            ),
            responses =
            @ApiResponse(responseCode = "200", description = "리뷰 생성 결과",
                    content =
                    @Content(mediaType="application/json",
                            schema=@Schema(implementation=BeerReviewCreateResponse.class))
            )
    )
    BeerReviewCreateResponse createReview(
            @Parameter(description = "맥주 ID") Long beerId,
            @RequestBody(description = "등록할 맥주 리뷰 정보") BeerReviewCreateForm form,
            HttpServletRequest request
    );
}
