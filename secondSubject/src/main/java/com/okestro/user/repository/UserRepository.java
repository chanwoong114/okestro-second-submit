package com.okestro.user.repository;

import com.okestro.user.dto.CreateUserDto;
import com.okestro.user.dto.UpdateRefreshTokenDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

    Integer findUserIdByEmail(String email);

    String findPasswdByEmail(String email);

    void signUp(CreateUserDto createUserDto);

    void updateRefreshToken(UpdateRefreshTokenDTO updateRefreshTokenDTO);
}
