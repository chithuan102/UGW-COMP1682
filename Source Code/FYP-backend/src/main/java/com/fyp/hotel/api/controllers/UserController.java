/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.User;
import com.fyp.hotel.api.models.LoginRequest;
import com.google.gson.JsonObject;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@Slf4j
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController extends BaseController {

    @RequestMapping(path = "/info/{id}", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt login(@RequestBody LoginRequest request) {
        User user = new User();
//        permissionRepo.save(request);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createUser(@RequestBody User request) {
        User ent = userRepo.findOneByUsername(request.getUsername()).orElse(new User());
        if (ent.getId() > 0) {
            return ResultEnt.ofInvalid("Username exist");
        }
        userRepo.save(request);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt update(@RequestBody User request) {
        userRepo.save(request);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt get() {
        return ResultEnt.ofSuccess(userRepo.findAll());
    }

    @RequestMapping(path = "/{id}", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public ResultEnt delete(@PathVariable("id") long userId) {
        userRepo.deleteById(userId);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/{id}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt findById(@PathVariable("id") long id) {
        return ResultEnt.ofSuccess(userRepo.findById(id).get());
    }

    @RequestMapping(path = "/login", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt findById(@RequestBody LoginRequest request) {
        User user = userRepo.findOneByUsernameAndPassword(request.getUsername(), request.getPassword()).orElse(new User());
//        if (user.getId() == 0) {
//            return ResultEnt.ofInvalid("User not exist!");
//        }
        if (user.getId() == 0) {
            return ResultEnt.ofInvalid("Username or Password Incorrect");
        }
        String uuid = UUID.randomUUID().toString();
        localCache.set(uuid, String.valueOf(user.getId()));
        JsonObject object = new JsonObject();
        object.addProperty("accessToken", uuid);
        return ResultEnt.ofSuccess(object.toString());
    }

    @RequestMapping(path = "/info", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt info(@RequestBody LoginRequest request) {
        long userId = NumberUtils.toLong(localCache.get(request.getAccessToken()));
        if( userId == 0){
             return ResultEnt.ofInvalid("Token Invalid");
        }

        User user = userRepo.findById(userId).orElse(new User());
        if (user.getId() == 0) {
            return ResultEnt.ofInvalid("Username or Password Incorrect");
        }
//        permissionRepo.save(request);
        return ResultEnt.ofSuccess(user);
    }

}
