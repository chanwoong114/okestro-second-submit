package com.okestro.board.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardListResponse {

    private Long boardId;
    private String title;
    private LocalDateTime updatedAt;
    private String nickname;
}
