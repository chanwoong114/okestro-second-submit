package com.okestro.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.config.BcryptConfig;
import com.okestro.secure.Jwt;
import com.okestro.secure.JwtProvider;
import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.secure.dto.LoginUserRequest;
import com.okestro.secure.dto.VerifyUser;
import com.okestro.secure.filter.JwtAuthorizationFilter;
import com.okestro.user.dto.CreateUserDto;
import com.okestro.user.dto.CreateUserRequest;
import com.okestro.user.dto.UpdateRefreshTokenDTO;
import com.okestro.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BcryptConfig bcryptConfig;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    public Integer getUserIdByEmail(String email) {
        return userRepository.findUserIdByEmail(email);
    }

    public Jwt login(LoginUserRequest loginUserRequest) throws JsonProcessingException {
        VerifyUser verifyUser = verifyUser(loginUserRequest);
        if (verifyUser.isValid()) {
            AuthenticationUser authenticationUser = new AuthenticationUser(loginUserRequest.getEmail(), verifyUser.getUserId());
            Map<String, Object> claims = new HashMap<>();
            String authenticationUserJson = objectMapper.writeValueAsString(authenticationUser);
            claims.put(jwtAuthorizationFilter.AUTHENTICATE_USER, authenticationUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            updateRefreshToken(authenticationUser.getEmail(), jwt.getRefreshToken());
            return jwt;
        } else {
            return null;
        }
    }


    public VerifyUser verifyUser(LoginUserRequest loginUserRequest) {
        String password = userRepository.findPasswdByEmail(loginUserRequest.getEmail());
        if (password == null || !bcryptConfig.isMatch(loginUserRequest.getPasswd(), password)) {
            return VerifyUser.builder()
                    .isValid(false)
                    .build();
        }
        Integer userId = userRepository.findUserIdByEmail(loginUserRequest.getEmail());
        return VerifyUser.builder()
                .isValid(true)
                .userId(userId)
                .build();
    }

    public void updateRefreshToken(String email, String refreshToken) {
        userRepository.updateRefreshToken(UpdateRefreshTokenDTO.builder()
                        .email(email)
                        .refreshToken(refreshToken)
                        .build());
    }

    public void signUp(CreateUserRequest createUserRequest) {
        Integer userId = userRepository.findUserIdByEmail(createUserRequest.getEmail());
        if (userId == null) {
            userRepository.signUp(CreateUserDto.builder()
                    .email(createUserRequest.getEmail())
                    .passwd(bcryptConfig.encrypt(createUserRequest.getPasswd()))
                    .name(createUserRequest.getName())
                    .nickname(createUserRequest.getNickname())
                    .build());
            return;
        }
        throw new RuntimeException("잘못된 접근");
    }

    public Jwt refreshToken(String refreshToken) {
        try {
            jwtProvider.getClaims(refreshToken);
            HashMap<String, Object> claims = new HashMap<>();
            AuthenticationUser authenticationUser = userRepository.findAuthUserByRefreshToken(refreshToken);
            String authenticationUserJson = objectMapper.writeValueAsString(authenticationUser);
            claims.put(jwtAuthorizationFilter.AUTHENTICATE_USER, authenticationUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            updateRefreshToken(authenticationUser.getEmail(),jwt.getRefreshToken());
            return jwt;
        } catch (Exception e) {
            throw null;
        }
    }

    public boolean checkEmail(String email) {
        return userRepository.findUserIdByEmail(email) != null;
    }

    public boolean checkNickname(String nickname) {
        return userRepository.findUserIdByNickname(nickname) != null;
    }
}
