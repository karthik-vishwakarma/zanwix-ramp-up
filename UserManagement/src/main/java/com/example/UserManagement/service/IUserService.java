package com.example.UserManagement.service;

import com.example.UserManagement.dto.request.UserRequest;
import com.example.UserManagement.entities.User;

import java.util.List;

public interface IUserService {

    void save(UserRequest userRequest);

    void update(long id, UserRequest userRequest);

    User findById(long id);

    void delete(long id);

    List<User> findAll();
}
