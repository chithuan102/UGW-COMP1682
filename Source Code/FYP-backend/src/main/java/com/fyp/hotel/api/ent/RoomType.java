/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
@Entity
public class RoomType extends MasterEnt implements Serializable {
    
    @NotNull
    int maxOccupancy;
    
    int bed;
    int area;
    String thumbnail;
    String banner;
    
    String description;

    @NotNull
    long price;
    
    int totalBooked;

   
    
    @OneToMany(mappedBy = "roomType")
    List<Comment> comments;

    @ManyToMany
    @JoinTable(name = "room_type_room_service",
            joinColumns = @JoinColumn(name = "room_type_id"),
            inverseJoinColumns = @JoinColumn(name = "room_service_id"))
    List<RoomService> roomServices;
    
    public void increaseTotalBooked(){
        this.totalBooked = this.totalBooked +1;
    }
}
