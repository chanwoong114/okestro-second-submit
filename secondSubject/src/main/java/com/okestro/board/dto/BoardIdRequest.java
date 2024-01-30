package com.okestro.board.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardIdRequest {
    private Long boardId;
}
