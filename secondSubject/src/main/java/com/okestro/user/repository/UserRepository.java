package com.okestro.user.repository;

import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.user.dto.CreateUserDto;
import com.okestro.user.dto.UpdateRefreshTokenDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

    Integer findUserIdByEmail(String email);

    Integer findUserIdByNickname(String nickname);

    String findPasswdByEmail(String email);

    void signUp(CreateUserDto createUserDto);

    void updateRefreshToken(UpdateRefreshTokenDTO updateRefreshTokenDTO);

    AuthenticationUser findAuthUserByRefreshToken(String refreshToken);
}
