package com.okestro.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateRefreshTokenDTO {
    private String email;
    private String refreshToken;
}
