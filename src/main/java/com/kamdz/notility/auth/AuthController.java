package com.kamdz.notility.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kamdz.notility.config.UserAuthenticationProvider;
import com.kamdz.notility.dto.UserDto;
import com.kamdz.notility.model.Credential;
import com.kamdz.notility.model.SignUp;
import com.kamdz.notility.model.User;
import com.kamdz.notility.repository.UserRepository;
import com.kamdz.notility.service.UserService;

import java.net.URI;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid Credential credentialsDto) {
        System.out.println(credentialsDto);
        UserDto userDto = userService.login(credentialsDto);
        System.out.println(userDto);

        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        System.out.println(userDto.getToken());

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody @Valid SignUp user) {
        System.out.println(user.getPassword());
        Optional<User> existingUser = userRepository.findByLogin(user.getLogin());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getUser_id())).body(createdUser);
    }

}