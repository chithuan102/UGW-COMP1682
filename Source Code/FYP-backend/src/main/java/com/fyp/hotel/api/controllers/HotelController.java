/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
//import com.fyp.hotel.api.ent.Chain;
import com.fyp.hotel.api.ent.Hotel;
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
@RequestMapping("/hotel")
@CrossOrigin("*")
public class HotelController extends BaseController {


    @RequestMapping(path = "/info", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getInfo() {
        return ResultEnt.ofSuccess(hotelRepo.findAll().get(0));
    }

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createHotel(@RequestBody Hotel hotel) {
//        hotel.setPropertyId(hotel.getChain().getId());
        hotelRepo.save(hotel);
        return ResultEnt.SUCCESS;
    }
    
    
    @RequestMapping(path = "", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public boolean deleteAll() {
        hotelRepo.deleteAll();
        return true;
    }

}
