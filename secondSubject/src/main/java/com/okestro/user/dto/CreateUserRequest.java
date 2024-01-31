package com.okestro.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateUserRequest {

    private String email;
    private String passwd;
    private String name;
    private String nickname;
}
