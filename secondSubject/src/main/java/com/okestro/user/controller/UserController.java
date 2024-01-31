package com.okestro.user.controller;

import com.okestro.user.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/user-id")
    public ResponseEntity<Integer> getUserIdByEmail(@RequestParam String email) {

        return ResponseEntity.ok(userService.getUserIdByEmail(email));
    }
}
