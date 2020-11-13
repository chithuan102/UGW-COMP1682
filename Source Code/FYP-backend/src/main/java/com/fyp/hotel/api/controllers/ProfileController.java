/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.AccountType;
import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.ReservationStatus;
import com.fyp.hotel.api.ent.User;
import com.fyp.hotel.api.models.ChangePasswordRequest;
import com.fyp.hotel.api.models.LoginRequest;
import com.fyp.hotel.api.utils.SendMailUtils;
import com.google.gson.JsonObject;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import redis.clients.jedis.Response;

/**
 *
 * @author mct
 */
@RestController
@Slf4j
@RequestMapping("/profile")
@CrossOrigin("*")
public class ProfileController extends BaseController {

    @RequestMapping(path = "/login", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt login(@RequestBody LoginRequest loginRequest) {
        Profile profile = new Profile();
        switch (loginRequest.getLoginType()) {
            case 0:
                profile = profileRepo.findOneByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword()).orElse(new Profile());
                break;
            case 1:
                profile = profileRepo.findByEmail(loginRequest.getEmail()).orElse(new Profile());
                if (profile.getId() == 0) {
                    profile.setGoogleId(loginRequest.getGoogeId());
                    profile.setEmail(loginRequest.getEmail());
                    profile.setFullName(loginRequest.getFullName());
                    profile.setAvatar(loginRequest.getAvatar());
                    profile.setAcountType(AccountType.GOOGLE);
                    profile.setActivated(true);
//                     profile.setCreatedDate(new Date());
                    profileRepo.save(profile);
                    profile = profileRepo.findByEmail(loginRequest.getEmail()).get();
                }
                if (profile.isActivated() == false) {
                    profile.setActivated(true);
                    profileRepo.save(profile);
                }

                break;

        }
        if (profile.isActivated() == false) {
            ResultEnt.ofInvalid("ACCOUNT_NOT_ACTIVATED");
        }
        String uuid = UUID.randomUUID().toString();
        localCache.set(uuid, String.valueOf(profile.getId()));
        JsonObject object = new JsonObject();
        object.addProperty("accessToken", uuid);
        return ResultEnt.ofSuccess(object.toString());
    }

    @RequestMapping(path = "/signUp", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt signUp(@RequestBody Profile profile) {
        Profile profileEnt = new Profile();
        profileEnt = profileRepo.findByEmail(profile.getEmail()).orElse(new Profile());
        if (profileEnt.getId() != 0 || profileEnt.isActivated()) {
            return ResultEnt.ofInvalid("Email exist!");
        }
//        profile.setCreatedDate(new Date());

        String sign = DigestUtils.md5Hex(String.valueOf(profile.getEmail()));
        localCache.set(sign, profile.getEmail());
        String url = "http://localhost:1998/profile/active/" + sign;
        SendMailUtils.sendMailActive("Active email", url, profile.getEmail(), profile.getFullName());
        profileRepo.save(profile);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/info/by-token", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt info(@RequestBody LoginRequest request) {
        long userId = NumberUtils.toLong(localCache.get(request.getAccessToken()));
        if (userId == 0) {
            return ResultEnt.ofInvalid("Token Invalid");
        }

        Profile profile = profileRepo.findById(userId).orElse(new Profile());
        if (profile.getId() == 0) {
            return ResultEnt.ofInvalid("Username or Password Incorrect");
        }
//        permissionRepo.save(request);
        return ResultEnt.ofSuccess(profile);
    }

    @RequestMapping(path = "/info/{userId}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getInfo(@PathVariable("userId") long userId) {
        if (userId > 0) {
            Profile profileEnt = profileRepo.findById(userId).get();
            return ResultEnt.ofSuccess(profileEnt);
        }
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/info", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createInfo(@RequestBody Profile profile) {
        profileRepo.save(profile);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/info/{userId}", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt updateInfo(@RequestBody Profile profile) {
        profile = profileRepo.save(profile);
        return ResultEnt.ofSuccess(profile);
    }

    @RequestMapping(path = "/changePassword", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt changePassword(@RequestBody ChangePasswordRequest request) {
        Profile profile = profileRepo.findById(request.getProfileId()).get();
        if (request.getNewPassword().isEmpty() == false) {
            profile.setPassword(request.getNewPassword());
            profileRepo.save(profile);
            return ResultEnt.SUCCESS;
        }
        return ResultEnt.ofInvalid("Old password not correct. Please try again");
    }

    @RequestMapping(path = "/active/{sign}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public String activeAccount(@PathVariable("sign") String sign) {
        String value = localCache.get(sign);
        System.out.println("");
        if (value == null) {
            return "<div><center>Link active invalid<center></div>";
        }
        Profile profile = profileRepo.findByEmail(value).get();
        profile.setActivated(true);
        profileRepo.save(profile);
        localCache.remove(sign);
        return "<div><center>Active account successfully<center></div>";
    }
    
    @RequestMapping(path = "/resend/{email}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt resendMail(@PathVariable("email") String email) {
        Profile profile = profileRepo.findByEmail(email).get();
        String sign = DigestUtils.md5Hex(String.valueOf(profile.getEmail()));
        localCache.set(sign, profile.getEmail());
        String url = "http://localhost:1998/profile/active/" + sign;
        SendMailUtils.sendMailActive("Active email", url, profile.getEmail(), profile.getFullName());
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/history/{userId}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getHistory(@PathVariable("userId") long userId) {
//        List<Reservation> reservations = reservationRepo.findAll();
//        for (Reservation reservation : reservations) {
//            if (reservation.getReservationStatus() == ReservationStatus.PENDING) {
//                reservationRepo.deleteById(reservation.getId());
//            }
//        }

        List<Reservation> listRes = reservationRepo.findByMainGuestId(userId);
        return ResultEnt.ofSuccess(listRes);
    }

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getAll() {
        return ResultEnt.ofSuccess(profileRepo.findAll());
    }

}
