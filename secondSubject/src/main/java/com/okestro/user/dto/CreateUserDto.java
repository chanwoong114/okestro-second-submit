package com.okestro.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateUserDto {
    private String email;
    private String passwd;
    private String name;
    private String nickname;
    private String refreshToken;

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
