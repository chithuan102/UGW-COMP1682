/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
@Entity
public class Room extends MasterEnt {

    @Column(unique = true)
    String roomCode;
    //CLEAN, DIRTY
    @Enumerated(EnumType.STRING)
    RoomStatus roomStatus;
    @ManyToOne
    RoomType roomType;
   

}
