/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Comment;
import com.fyp.hotel.api.ent.Contact;
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
public class CommonController extends BaseController{
    
    @RequestMapping(path = "/contact", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createContact(@RequestBody Contact request) {
        contactRepo.save(request);
        return ResultEnt.SUCCESS;
    }
    
    @RequestMapping(path = "/contact", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getContact() {
        return ResultEnt.ofSuccess(contactRepo.findAll());
    }
    
    @RequestMapping(path = "/contact", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt updateContact(@RequestBody Contact request) {
        contactRepo.save(request);
        return ResultEnt.SUCCESS;
    }

}
