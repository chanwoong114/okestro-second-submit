package com.okestro.board.service;

import com.okestro.board.dto.Board;
import com.okestro.board.dto.BoardResponse;
import com.okestro.board.dto.CreateBoardRequest;
import com.okestro.board.dto.UpdateBoardRequest;
import com.okestro.board.repository.BoardRepository;
import com.okestro.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public void createBoard(CreateBoardRequest createBoardRequest, Integer userId) {
        checkTitle(createBoardRequest.getTitle());
        Board board = Board.builder()
                .userId(userId)
                .title(createBoardRequest.getTitle())
                .content(createBoardRequest.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        boardRepository.createBoard(board);
    }

    public void updateBoard(UpdateBoardRequest updateBoardRequest, Integer userId) {
        BoardResponse boardResponse = boardRepository.findBoardById(updateBoardRequest.getBoardId());
        if (boardResponse == null) {
            throw new RuntimeException();
        }
        checkUserId(boardResponse.getUserId(), userId);
        checkTitle(updateBoardRequest.getTitle());

        BoardResponse updatedBoard = BoardResponse.builder()
                .boardId(boardResponse.getBoardId())
                .userId(boardResponse.getUserId())
                .title(updateBoardRequest.getTitle())
                .content(updateBoardRequest.getContent())
                .createdAt(boardResponse.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .build();

        boardRepository.updateBoard(updatedBoard);
    }

    public BoardResponse getBoardDetail(Long boardId) {
        return boardRepository.findBoardById(boardId);
    }

    public void deleteBoard(Long boardId, Integer userId) {
        checkUserId(boardRepository.findUserIdById(boardId), userId);
        boardRepository.deleteBoard(boardId);
    }

    public void checkTitle(String title) {
        if (title == null) {
            throw new RuntimeException("제목이 없습니다.");
        }
    }

    public void checkUserId(Integer id1, Integer id2) {
        if (!(Objects.equals(id1, id2))) {
            throw new RuntimeException("작성자와 동일하지 않습니다.");
        }
    }

}
