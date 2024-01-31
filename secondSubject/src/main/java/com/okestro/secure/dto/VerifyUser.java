package com.okestro.secure.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VerifyUser {

    private boolean isValid;
    private Integer userId;
}
