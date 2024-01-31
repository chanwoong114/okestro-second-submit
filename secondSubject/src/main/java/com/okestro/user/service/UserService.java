package com.okestro.user.service;

import com.okestro.config.BcryptConfig;
import com.okestro.secure.dto.LoginUserRequest;
import com.okestro.secure.dto.VerifyUser;
import com.okestro.user.dto.CreateUserDto;
import com.okestro.user.dto.CreateUserRequest;
import com.okestro.user.dto.UpdateRefreshTokenDTO;
import com.okestro.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BcryptConfig bcryptConfig;

    public Integer getUserIdByEmail(String email) {
        return userRepository.findUserIdByEmail(email);
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
        userRepository.signUp(CreateUserDto.builder()
                        .email(createUserRequest.getEmail())
                        .passwd(bcryptConfig.encrypt(createUserRequest.getPasswd()))
                        .name(createUserRequest.getName())
                        .nickname(createUserRequest.getNickname())
                        .build());
    }
}
