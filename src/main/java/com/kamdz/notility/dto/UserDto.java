package com.kamdz.notility.dto;

import com.kamdz.notility.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long user_id;
    private String email;
    private String login;
    private String token;
    private Role role;

}