package com.okestro.user.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
@Builder
public class CreateUserRequest {

    @Email
    private String email;
    private String passwd;
    private String name;
    private String nickname;
}
