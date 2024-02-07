package com.okestro.board.service;

import com.okestro.board.dto.*;
import com.okestro.board.repository.BoardRepository;
import com.okestro.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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

    public Integer totalBoardPage() {
        return boardRepository.findBoardCount();
    }

    public List<BoardListResponse> boardList(Integer page) {
        Integer pages = (page - 1) * 10;
        return boardRepository.findBoardList(pages);
    }

    public Boolean isMine(Long boardId, Integer userId) {
        System.out.println(Objects.equals(boardRepository.findBoardById(boardId).getUserId(), userId));
        return Objects.equals(boardRepository.findBoardById(boardId).getUserId(), userId);
    }

    public void testData() {
        for (int i = 0; i < 100; i++) {
            CreateBoardRequest createBoardRequest = CreateBoardRequest.builder()
                    .title("title" + i)
                    .content("물고기들이 바닷속을 헤엄치며 서로 놀아주는 모습이 참으로 아름답습니다. 푸른 바다 속에서는 수많은 생명들이 공존하며 서로에게 의지하고 있습니다. 작은 조개들이 모래 속에서 자신의 보금자리를 만들고, 컬러풀한 물고기들이 헤엄치며 바다의 심연을 탐험합니다. 이 모든 것들은 자연의 아름다움과 조화로움을 보여줍니다. 바닷속은 우리에게 끝없는 경이로움을 선사하며 우리를 놀라게 합니다. 생명력이 넘치고 아름다운 바닷속 세계는 우리가 지켜야 할 보물입니다.")
                    .build();

            createBoard(createBoardRequest, 1);
        }
    }
}
