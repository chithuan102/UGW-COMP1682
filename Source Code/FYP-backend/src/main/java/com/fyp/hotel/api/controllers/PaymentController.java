/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.ReservationStatus;
import com.fyp.hotel.api.ent.Room;
import com.fyp.hotel.api.ent.RoomStatus;
import com.fyp.hotel.api.models.PaymentHook;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController extends BaseController {

    @RequestMapping(path = "/hook", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt webHook(@RequestBody PaymentHook request) throws ServletException, IOException {
        Reservation reservation = new Reservation();
        List<Reservation> list = new ArrayList<>();
        String[] ids = request.getReservationId().split("_");
        for (String id : ids) {
            reservation = reservationRepo.findById(NumberUtils.toLong(id)).orElse(new Reservation());
            if (reservation.getId() == 0 || reservation.getReservationStatus() != ReservationStatus.PENDING) {
                return ResultEnt.BAD_REQUEST;
            } else {
                list.add(reservation);
            }
        }

        switch (request.getStat()) {
            case "c":
                for (Reservation object : list) {
                    object.setReservationStatus(ReservationStatus.ARRIVAL);
                    reservationRepo.save(object);
                }
                return ResultEnt.SUCCESS;

            default:
                for (Reservation object : list) {
                    Room room = roomRepo.findById(object.getRoomId()).get();
                    room.setRoomStatus(RoomStatus.AVAILABLE);
                    roomRepo.save(room);
                    reservationRepo.deleteById(object.getId());
                }
                return ResultEnt.ofSuccess("Delete reservation successfully");

        }
    }
}
