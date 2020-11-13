/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.User;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author mct
 */
public interface ReservationRepo extends JpaRepository<Reservation, Long> {

    List<Reservation> findByMainGuestId(long id);

    @Query(value = "FROM Reservation b "
            + "WHERE :arrivalDate BETWEEN b.arrivalDate AND b.departureDate "
            + "OR :departureDate BETWEEN b.arrivalDate AND b.departureDate "
            + "OR (:arrivalDate <= b.arrivalDate AND :departureDate >= b.departureDate)")
    List<Reservation> findRervationAvailable(@Param("arrivalDate") Date startDate, @Param("departureDate") Date endDate);
    
         @Query(value = "FROM Reservation b "
            + "WHERE b.roomId = :roomId AND b.reservationStatus NOT IN ('CHECKOUT')")
        List<Reservation> findRoomReservation(@Param("roomId") long roomId );
        
        
        List<Reservation> findByArrivalDateBetweenOrderByCreatedTimeAsc(Date date1,Date date2 );
        
        
}
