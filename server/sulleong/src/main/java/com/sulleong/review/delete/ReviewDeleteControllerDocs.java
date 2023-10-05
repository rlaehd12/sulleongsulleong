package com.sulleong.review.delete;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "맥주 리뷰 삭제", description = "맥주 리뷰를 삭제하는 API")
public interface ReviewDeleteControllerDocs {

    @Operation(summary = "맥주 리뷰 삭제",
            parameters = {
                    @Parameter(
                            in = ParameterIn.PATH,
                            name = "reviewId",
                            required = true,
                            schema = @Schema(type = "integer"),
                            description = "리뷰 ID"
                    ),
                    @Parameter(
                            in = ParameterIn.HEADER,
                            name = "Authorization",
                            required = true,
                            schema = @Schema(type = "string"),
                            description ="인증 토큰"
                    )
            },
            responses = @ApiResponse(responseCode="200", description="리뷰 삭제 결과")
    )
    ResponseEntity<Void> deleteReview(@PathVariable("reviewId") Long reviewId, HttpServletRequest request);
}
