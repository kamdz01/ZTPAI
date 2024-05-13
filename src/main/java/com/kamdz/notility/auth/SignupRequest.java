package com.kamdz.notility.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String login;
    private String password;
    private String email;

}
