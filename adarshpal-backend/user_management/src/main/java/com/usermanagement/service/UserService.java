package com.usermanagement.service;

import com.usermanagement.entity.User;
import com.usermanagement.repsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);

    }
    public User createUser(User user) {
        return userRepository.save(user);

    }
    public User updateUser(Long id, User userdetails){
     User user = userRepository.findById(id)
             .orElseThrow(() -> new RuntimeException("user not found"+id));
     user.setUser_name(userdetails.getUser_name());
     user.setEmail_id(userdetails.getEmail_id());
     user.setUser_password(userdetails.getUser_password());
     return userRepository.save(user);
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
