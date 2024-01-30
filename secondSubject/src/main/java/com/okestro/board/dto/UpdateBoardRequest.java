package com.okestro.board.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardRequest {

    private Long boardId;
    private String title;
    private String content;
}
