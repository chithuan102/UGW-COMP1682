/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Hotel;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.ReservationStatus;
import com.fyp.hotel.api.ent.Room;
import com.fyp.hotel.api.ent.RoomStatus;
import com.fyp.hotel.api.models.RoomRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@RequestMapping("/room")
@CrossOrigin("*")
public class RoomController extends BaseController {

    List<ReservationStatus> resStatusNotAvailable = Arrays.asList(ReservationStatus.INHOUSE, ReservationStatus.ARRIVAL, ReservationStatus.PENDING);

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getRoomType() {
        return ResultEnt.ofSuccess(roomTypeRepo.findAll());
    }

    @RequestMapping(path = "/available", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt getAvailableRoom(@RequestBody RoomRequest request) {
        List<Room> rooms = roomRepo.findAll();

        List<Reservation> lstReservation = reservationRepo
                .findRervationAvailable(request.getArrivalDate(), request.getDepartureDate());
        List<Room> roomAvailable = new ArrayList<>();
        List<Long> roomIds = lstReservation.stream().filter(x -> resStatusNotAvailable.contains(x.getReservationStatus())).map(Reservation::getRoomId).collect(Collectors.toList());
        for (Room room : rooms) {
            if (!roomIds.contains(room.getId())) {
                roomAvailable.add(room);
            }
        }
        roomAvailable = roomAvailable.stream().filter(room -> room.getRoomType().getMaxOccupancy() >= request.getNoOfGuest() && room.isDisabled() == false).collect(Collectors.toList());
        if (request.getRoomTypeId() > 0) {
            return ResultEnt.ofSuccess(roomAvailable.stream().filter(room -> room.getRoomType().getId() == request.getRoomTypeId()).collect(Collectors.toList()));
        }
        return ResultEnt.ofSuccess(roomAvailable);

    }

    @RequestMapping(path = "/reservation/{roomId}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getReservationAvailableByRoom(@PathVariable("roomId") long roomId) {
        List<Reservation> reservations = reservationRepo.findRoomReservation(roomId);
        if (reservations.size() > 0) {

            return ResultEnt.ofSuccess(reservations.get(0));
        }

        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/physicalRoom", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getAllPhysicalRoom() {
        return ResultEnt.ofSuccess(roomRepo.findAll());
    }

    @RequestMapping(path = "/physicalRoom", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createRoom(@RequestBody Room request) {
        Room room = roomRepo.findByRoomCode(request.getRoomCode()).orElse(new Room());
        if (room.getId() == 0) {
            room.setRoomStatus(RoomStatus.AVAILABLE);
            room.setRoomCode(request.getRoomCode());
            room.setRoomType(roomTypeRepo.findById(request.getRoomType().getId()).get());

            roomRepo.save(room);
            return ResultEnt.SUCCESS;
        }
        return ResultEnt.BAD_REQUEST;
    }
    
     @RequestMapping(path = "/physicalRoom", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt updateRoom(@RequestBody Room request) {
        roomRepo.save(request);
        return ResultEnt.BAD_REQUEST;
    }
}
