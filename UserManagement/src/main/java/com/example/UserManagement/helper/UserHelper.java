package com.example.UserManagement.helper;

import com.example.UserManagement.entities.User;
import com.example.UserManagement.repository.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.NotActiveException;
import java.util.List;

@Component
public class UserHelper {

    private UserRepository userRepository;

    @Autowired
    public UserHelper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(User user){
        userRepository.save(user);
    }

    public User findById(long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public void delete(User user){
        userRepository.delete(user);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }
}
