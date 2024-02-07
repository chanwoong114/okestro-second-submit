package com.okestro.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.okestro.secure.Jwt;
import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.secure.dto.LoginUserRequest;
import com.okestro.secure.filter.JwtAuthorizationFilter;
import com.okestro.user.dto.CreateUserRequest;
import com.okestro.user.dto.RefreshTokenDto;
import com.okestro.user.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
    public ResponseEntity<String> signUp(@Valid @RequestBody CreateUserRequest createUserRequest) {
        userService.signUp(createUserRequest);
        return ResponseEntity.status(201).body("CREATED");
    }

    @PostMapping("/login")
    public ResponseEntity<Jwt> login(@RequestBody LoginUserRequest loginUserRequest) throws JsonProcessingException {
        Jwt jwt = userService.login(loginUserRequest);
        if (jwt == null) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(jwt);
    }
}
