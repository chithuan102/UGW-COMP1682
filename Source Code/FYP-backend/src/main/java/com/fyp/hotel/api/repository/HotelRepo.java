/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.Hotel;
import com.fyp.hotel.api.ent.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author mct
 */

public interface HotelRepo extends JpaRepository<Hotel,Long> {
    

    
}
