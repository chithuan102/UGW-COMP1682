/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

/**
 *
 * @author mct
 */
@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends MasterEnt {

    String fullName;
    String address;
    String phoneNumber;
    String password;
    @Column(unique = true)
    String username;

    @ManyToOne
    Role role;

}
