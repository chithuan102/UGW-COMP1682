/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.models;

import lombok.Data;

/**
 *
 * @author mct
 */
@Data
public class LoginRequest {

    String password;
    String email;
    //0: password, 1:goolge
    int loginType;

    String googeId;
    String fullName;
    String avatar;
    String username;
    String accessToken;

}
