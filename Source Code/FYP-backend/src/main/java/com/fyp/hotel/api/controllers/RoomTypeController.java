/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.RoomType;
import com.fyp.hotel.api.ent.Room;
import com.fyp.hotel.api.models.RoomAvailabilityRequest;
import java.util.List;
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
@RequestMapping("/room-type")
@CrossOrigin("*")
public class RoomTypeController extends BaseController {

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getAllRoom() {
        return ResultEnt.ofSuccess(roomTypeRepo.findAll());
    }

    @RequestMapping(path = "/{id}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getRoomDetail(@PathVariable("id") long roomTypeId) {
        return ResultEnt.ofSuccess(roomTypeRepo.findById(roomTypeId).get());
    }
    
   
    

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createRoom(@RequestBody RoomType room) {
        roomTypeRepo.save(room);
        return ResultEnt.SUCCESS;
    }
    
     @RequestMapping(path = "", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt updateRoomType(@RequestBody RoomType room) {
        roomTypeRepo.save(room);
        return ResultEnt.SUCCESS;
    }

}
