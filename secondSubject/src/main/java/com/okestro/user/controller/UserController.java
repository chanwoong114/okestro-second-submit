package com.okestro.user.controller;

import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.secure.filter.JwtAuthorizationFilter;
import com.okestro.user.dto.CreateUserRequest;
import com.okestro.user.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/user-id")
    public ResponseEntity<Integer> getUserIdByEmail(ServletRequest request) {
        AuthenticationUser authenticationUser = (AuthenticationUser) request.getAttribute("authenticateUser");
        return ResponseEntity.ok(userService.getUserIdByEmail(authenticationUser.getEmail()));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody CreateUserRequest createUserRequest) {
        userService.signUp(createUserRequest);
        return ResponseEntity.status(201).body("CREATED");
    }
}
