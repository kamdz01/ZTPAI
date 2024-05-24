package com.kamdz.notility.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.kamdz.notility.dto.UserDto;
import com.kamdz.notility.exceptions.AppException;
import com.kamdz.notility.mapper.UserMapper;
import com.kamdz.notility.model.Credential;
import com.kamdz.notility.model.Role;
import com.kamdz.notility.model.SignUp;
import com.kamdz.notility.model.User;
import com.kamdz.notility.repository.UserRepository;
import com.kamdz.notility.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private final UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;
    private final RoleRepository roleRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setLogin(userDetails.getLogin());
            user.setEmail(userDetails.getEmail());
            user.setRole(userDetails.getRole());

            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserRole(Long id, Role userRole) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(userRole);

            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto getUserByLogin(String login) {
        User user = userRepository.findByLogin(login).orElseThrow(() -> new Error("User not found"));
        return userMapper.toUserDto(user);
    }

    public UserDto login(Credential credentialsDto) {
        System.out.println("getLogin: "+credentialsDto.getLogin());
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        System.out.println("getUser: "+user.getLogin());

        if (bCryptPasswordEncoder.matches(new String(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUp userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        roleRepository.findById(2L).ifPresent(user::setRole);

        user.setPassword(bCryptPasswordEncoder.encode(new String(userDto.getPassword())));

        // Save the user
        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }
}
