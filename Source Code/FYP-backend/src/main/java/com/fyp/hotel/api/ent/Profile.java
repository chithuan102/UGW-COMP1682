/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.TemporalType;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.Temporal;

/**
 *
 * @author mct
 */
@Entity
@Data
public class Profile extends BaseEnt{
    
    String fullName;
    String lastName;
    String firstName;
    String avatar;
    String title;

    String address;
    String phoneNumber;
    String paymentType;
    String paymentId;
    @Column(unique = true)
    String googleId;
    
    String idCardNumber;
    String idCardType;
    
//    @CreatedDate
//    Date createdDate;

    String password;

    boolean activated;
    
    String birthDate;
    String gender;

    @Column(unique = true)
    String email;

    @Enumerated(EnumType.STRING)
    AccountType acountType;

     
    @ManyToMany(mappedBy = "guests")
    @JsonIgnore
    private List<Reservation> reservations;

    
    @OneToMany(mappedBy = "profile", cascade = CascadeType.PERSIST)
            
    @JsonIgnore
    List<Comment> comment;
}
