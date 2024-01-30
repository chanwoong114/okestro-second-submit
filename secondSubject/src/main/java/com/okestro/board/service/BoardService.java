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

    public void createBoard(CreateBoardRequest createBoardRequest, String email) {
        Integer userId = userRepository.findUserIdByEmail(email);
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

    public void updateBoard(UpdateBoardRequest updateBoardRequest, String email) {
        BoardResponse boardResponse = boardRepository.findBoardById(updateBoardRequest.getBoardId());
        if (boardResponse == null) {
            throw new RuntimeException();
        }
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
        return boardRepository.findBoardDetail(boardId);
    }

    public void deleteBoard(Long boardId, String email) {
        if (!Objects.equals(boardRepository.findUserIdById(boardId), userRepository.findUserIdByEmail(email))) {
            throw new RuntimeException("작성자만 삭제 가능합니다.");
        }
        boardRepository.deleteBoard(boardId);
    }

    public void checkTitle(String title) {
        if (title == null) {
            throw new RuntimeException("제목이 없습니다.");
        }
    }

}
