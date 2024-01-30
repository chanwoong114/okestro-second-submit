package com.okestro.board.controller;

import com.okestro.board.dto.BoardIdRequest;
import com.okestro.board.dto.BoardResponse;
import com.okestro.board.dto.CreateBoardRequest;
import com.okestro.board.dto.UpdateBoardRequest;
import com.okestro.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<String> createBoard(@RequestBody CreateBoardRequest createBoardRequest) {
        String email = null;

        boardService.createBoard(createBoardRequest, email);
        return ResponseEntity.status(201).body("CREATED");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateBoard(@RequestBody UpdateBoardRequest updateBoardRequest) {
        String email = null;

        boardService.updateBoard(updateBoardRequest, email);
        return ResponseEntity.status(202).body("UPDATED");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteBoard(@RequestBody BoardIdRequest boardIdRequest) {
        String email = null;

        boardService.deleteBoard(boardIdRequest.getBoardId(), email);
        return ResponseEntity.status(204).body("NO CONTENT");
    }

    @GetMapping ("/detail")
    public ResponseEntity<BoardResponse> detailBoard(@RequestParam Long boardId) {
        return ResponseEntity.ok(boardService.getBoardDetail(boardId));
    }
}
