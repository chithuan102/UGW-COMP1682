/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.FolioTransaction;
import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.RoomType;
import com.fyp.hotel.api.ent.User;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author mct
 */
public interface FolioTransactionRepo extends JpaRepository<FolioTransaction, Long> {

    @Query("SELECT r FROM FolioTransaction r WHERE createdTime >= :startDate AND createdTime <= :endDate ORDER BY createdTime DESC")
    List<FolioTransaction> findByCreatedTimeBetween(Date startDate, Date endDate);

    List<FolioTransaction> findByCreatedTime(Date date);

}
