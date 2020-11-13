/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Permission;
import com.fyp.hotel.api.ent.Role;
import com.fyp.hotel.api.ent.User;
import com.fyp.hotel.api.models.LoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@Slf4j
@RequestMapping("/role")
@CrossOrigin("*")
public class RoleController extends BaseController {

    @RequestMapping(path = "/permission", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getPermisson() {
        return ResultEnt.ofSuccess(permissionRepo.findAll());
    }

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getRole() {
        return ResultEnt.ofSuccess(roleRepo.findAll());
    }

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createRole(@RequestBody Role request) {
        roleRepo.save(request);
        return ResultEnt.SUCCESS;
    }
    @RequestMapping(path = "", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt update(@RequestBody Role request) {
        roleRepo.save(request);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/{roleId}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getRoleDetail(@PathVariable("roleId") long roleId) {
        return ResultEnt.ofSuccess(roleRepo.findById(roleId));
    }

    @RequestMapping(path = "/{roleId}", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public ResultEnt detelteRole(@PathVariable("roleId") long roleId) {
        roleRepo.deleteById(roleId);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/permission-by-role/{role}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getPermissions(@PathVariable("role") long roleId) {
        return ResultEnt.ofSuccess(roleRepo.findById(roleId));
    }

//    @RequestMapping(path = "/role", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
//    public ResultEnt updateRole(@RequestParam("propertyId") long propertyId) {
//        return ResultEnt.ofSuccess(roleRepo.findByPropertyId(propertyId));
//    }
//
//    @RequestMapping(path = "/role", method = {RequestMethod.POST, RequestMethod.OPTIONS})
//    public ResultEnt createRole(@RequestParam("propertyId") long propertyId) {
//        return ResultEnt.ofSuccess(roleRepo.findByPropertyId(propertyId));
//    }
}
