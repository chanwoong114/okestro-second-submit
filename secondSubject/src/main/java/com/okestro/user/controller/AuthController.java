package com.okestro.user.controller;

import com.okestro.secure.Jwt;
import com.okestro.user.dto.RefreshTokenDto;
import com.okestro.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/refresh-token")
    public ResponseEntity<Jwt> tokenRefresh(@RequestBody RefreshTokenDto refreshTokenDto) {
        Jwt jwt = userService.refreshToken(refreshTokenDto.getRefreshToken());
        if (jwt == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }
        return ResponseEntity.ok(jwt);
    }

    @GetMapping("/email-check")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        if (userService.checkEmail(email)) {
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }

    @GetMapping("/nickname-check")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        if (userService.checkNickname(nickname)) {
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }
}
