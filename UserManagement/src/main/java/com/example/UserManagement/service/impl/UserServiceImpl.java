package com.example.UserManagement.service.impl;

import com.example.UserManagement.dto.request.UserRequest;
import com.example.UserManagement.entities.User;
import com.example.UserManagement.helper.UserHelper;
import com.example.UserManagement.service.IUserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    private final UserHelper userHelper;

    @Autowired
    public UserServiceImpl(UserHelper userHelper) {
        this.userHelper = userHelper;
    }

    @Override
    public void save(UserRequest userRequest) {
        try {
            User user = new User();
            user.setName(userRequest.getName());
            user.setEmail(userRequest.getEmail());
            user.setPassword(userRequest.getPassword());
            this.userHelper.save(user);
        } catch (Exception e){
            throw new RuntimeException("failed to save user");
        }
    }

    @Override
    public void update(long id, UserRequest userRequest) {
        try {
            User dbUser = findById(id);
            dbUser.setName(userRequest.getName()!=null ? userRequest.getName() : dbUser.getName());
            this.userHelper.save(dbUser);
        } catch (Exception e){
            throw new RuntimeException("failed to save user");
        }
    }

    @Override
    public User findById(long id) {
        return userHelper.findById(id);
    }

    @Override
    public void delete(long id) {
        try{
            User user = findById(id);
            userHelper.delete(user);
        } catch (Exception e){
            throw new RuntimeException("failed to delete the user");
        }
    }

    @Override
    public List<User> findAll() {
        return userHelper.findAll();
    }
}
