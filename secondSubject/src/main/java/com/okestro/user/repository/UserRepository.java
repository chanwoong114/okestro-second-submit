package com.okestro.user.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

    Integer findUserIdByEmail(String email);
}
