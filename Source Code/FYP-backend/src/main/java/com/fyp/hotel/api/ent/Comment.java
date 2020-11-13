/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Data;

/**
 *
 * @author mct
 */
@Entity
@Data
public class Comment extends BaseEnt implements Serializable {

    String username;
    String comment;
    String gender;

    int rate;

    @ManyToOne
    @JsonIgnoreProperties("comments")
    RoomType roomType;
    
    @ManyToOne
    private Profile profile;

}
