/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.repository;

import com.fyp.hotel.api.ent.Room;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author mct
 */
public interface RoomRepo extends JpaRepository<Room, Long> {

//    @Query(value = "from Room r "
//            + "WHERE r.propertyId = :propertyId "
//            + "AND NOT EXIST("
//            + "SELECT 1 * FROM Reservation b "
//            + "WHERE b.roomId = r.id "
//            + "AND :arrivalDate BETWEEN b.arrivalDate AND b.departureDate "
//            + "OR :departureDate BETWEEN b.arrivalDate AND b.departureDate "
//            + "OR (:arrivalDate <= b.arrivalDate AND :departureDate >= b.departureDate))"
//    )
//    List<Room> findAvailableRoom(@Param("propertyId") long propertyId, @Param("arrivalDate") String arrivalDate, @Param("departureDate") String departureDate);

    Optional<Room> findByRoomCode(String roomCode);

    List<Room> findByRoomTypeId(long roomTyleId);

}
