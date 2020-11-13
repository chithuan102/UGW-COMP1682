/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.RoomService;
import com.fyp.hotel.api.ent.TransactionCode;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequestMapping("/transaction-code")
@CrossOrigin("*")
public class TransactionCodeController extends BaseController {

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getAllTransactionCode() {
        return ResultEnt.ofSuccess(transactionCodeRepo.findAll().stream().filter(code -> code.isDisabled() == false).collect(Collectors.toList()));
    }

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createTransactionCode(@RequestBody TransactionCode request) {
        transactionCodeRepo.save(request);
        return ResultEnt.SUCCESS;
    }
    
     @RequestMapping(path = "/{id}", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public ResultEnt deleteTransactionCode(@PathVariable("id") long id) {
        TransactionCode code = transactionCodeRepo.findById(id).get();
        code.setDisabled(true);
        transactionCodeRepo.save(code);
        return ResultEnt.SUCCESS;
    }
}
