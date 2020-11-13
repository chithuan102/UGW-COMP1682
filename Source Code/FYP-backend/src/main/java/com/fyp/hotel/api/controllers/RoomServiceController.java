/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.RoomType;
import com.fyp.hotel.api.ent.RoomService;
import com.fyp.hotel.api.models.RoomAvailabilityRequest;
import java.util.List;
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
@CrossOrigin("*")
@RequestMapping("/room-service")
public class RoomServiceController extends BaseController {
    
    
    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getAllRoomService() {
        return ResultEnt.ofSuccess(roomServiceRepo.findAll());
    }
    
    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createRoomService(@RequestBody RoomService request) {
        roomServiceRepo.save(request);
        return ResultEnt.SUCCESS;
    }
    
    @RequestMapping(path = "", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt update(@RequestBody RoomService request) {
        roomServiceRepo.save(request);
        return ResultEnt.SUCCESS;
    }
    
     @RequestMapping(path = "", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public ResultEnt delete(@RequestBody RoomService request) {
        roomServiceRepo.deleteById(request.getId());
        return ResultEnt.SUCCESS;
    }
}
