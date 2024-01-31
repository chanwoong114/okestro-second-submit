package com.okestro.board.controller;

import com.okestro.board.dto.BoardIdRequest;
import com.okestro.board.dto.BoardResponse;
import com.okestro.board.dto.CreateBoardRequest;
import com.okestro.board.dto.UpdateBoardRequest;
import com.okestro.board.service.BoardService;
import com.okestro.secure.dto.AuthenticationUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<String> createBoard(ServletRequest servletRequest,
                                              @RequestBody CreateBoardRequest createBoardRequest) {
        AuthenticationUser authenticationUser = (AuthenticationUser) servletRequest.getAttribute("authenticateUser");
        boardService.createBoard(createBoardRequest, authenticationUser.getUserId());
        return ResponseEntity.status(201).body("CREATED");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateBoard(ServletRequest servletRequest,
                                              @RequestBody UpdateBoardRequest updateBoardRequest) {
        AuthenticationUser authenticationUser = (AuthenticationUser) servletRequest.getAttribute("authenticateUser");


        boardService.updateBoard(updateBoardRequest, authenticationUser.getUserId());
        return ResponseEntity.status(202).body("UPDATED");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteBoard(ServletRequest servletRequest,
                                              @RequestBody BoardIdRequest boardIdRequest) {
        AuthenticationUser authenticationUser = (AuthenticationUser) servletRequest.getAttribute("authenticateUser");


        boardService.deleteBoard(boardIdRequest.getBoardId(), authenticationUser.getUserId());
        return ResponseEntity.status(204).body("NO CONTENT");
    }

    @GetMapping ("/detail")
    public ResponseEntity<BoardResponse> detailBoard(@RequestParam Long boardId) {
        return ResponseEntity.ok(boardService.getBoardDetail(boardId));
    }
}
