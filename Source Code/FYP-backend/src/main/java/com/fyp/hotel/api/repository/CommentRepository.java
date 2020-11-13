/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.Comment;
import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.TransactionCode;
import com.fyp.hotel.api.ent.User;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author mct
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByTitle(String title);

    List<Comment> findByRoomTypeId(long roomTypeId);

    List<Comment> findByCreatedTimeBetween(Date date1, Date date2);

}
