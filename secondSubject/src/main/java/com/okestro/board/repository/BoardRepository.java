package com.okestro.board.repository;

import com.okestro.board.dto.Board;
import com.okestro.board.dto.BoardListResponse;
import com.okestro.board.dto.BoardResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardRepository {


    void createBoard(Board board);
    void updateBoard(BoardResponse boardResponse);
    BoardResponse findBoardById(Long boardId);
    Integer findUserIdById(Long boardId);

    List<BoardListResponse> findBoardList();
    List<BoardListResponse> findBoardListByUserId(Integer userId);
    void deleteBoard(Long boardId);
}
