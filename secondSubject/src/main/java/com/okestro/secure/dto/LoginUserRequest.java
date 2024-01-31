package com.okestro.secure.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginUserRequest {

    private String email;
    private String passwd;
}
