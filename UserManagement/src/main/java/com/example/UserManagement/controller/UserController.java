package com.example.UserManagement.controller;

import com.example.UserManagement.dto.request.UserRequest;
import com.example.UserManagement.entities.User;
import com.example.UserManagement.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final IUserService userService;

    @Autowired
    public UserController(final IUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody UserRequest userRequest){
        userService.save(userRequest);
        String message = "user created successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody UserRequest userRequest) {
        userService.update(id, userRequest);
        String message = "User updated Successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> fetchUsers(){
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> fetchUser(@PathVariable long id){
        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PutMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        userService.delete(id);
        String message = "User deleted Successfully";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
