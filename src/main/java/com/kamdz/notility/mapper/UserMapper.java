package com.kamdz.notility.mapper;

import com.kamdz.notility.dto.UserDto;
import com.kamdz.notility.model.SignUp;
import com.kamdz.notility.model.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mappings({
            @Mapping(source = "id", target = "user_id"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "login", target = "login"),
            @Mapping(source = "role", target = "role")
    })
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mappings({
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "login", target = "login"),
    })
    User signUpToUser(SignUp signUp);

}