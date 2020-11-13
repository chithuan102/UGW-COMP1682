/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.Profile;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author mct
 */
public interface ProfileRepo extends JpaRepository<Profile, Long> {

    Optional<Profile> findOneByGoogleId(String googleId);

    Optional<Profile> findByEmail(String email);

    Optional<Profile> findOneByEmailAndPassword(String userName, String password);

//        @Query("SELECT r FROM Profile r WHERE createdTime >= :startDate AND createdTime <= :endDate ORDER BY createdTime DESC")
    List<Profile> findByCreatedTimeBetween(Date startDate, Date endDate);

}
