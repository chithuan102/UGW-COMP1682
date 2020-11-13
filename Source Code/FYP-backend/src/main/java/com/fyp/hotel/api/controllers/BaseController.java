/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.cache.LocalCache;
import com.fyp.hotel.api.ent.RoomService;
import com.fyp.hotel.api.repository.CommentRepository;
import com.fyp.hotel.api.repository.ContactRepo;
import com.fyp.hotel.api.repository.FolioTransactionRepo;
import com.fyp.hotel.api.repository.HotelRepo;
import com.fyp.hotel.api.repository.PermissionRepo;
import com.fyp.hotel.api.repository.ProfileRepo;
import com.fyp.hotel.api.repository.ReportRepo;
import com.fyp.hotel.api.repository.ReservationRepo;
import com.fyp.hotel.api.repository.RoleRepo;
import com.fyp.hotel.api.repository.RoomServiceRepo;
import com.fyp.hotel.api.repository.TransactionCodeRepo;
import com.fyp.hotel.api.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.fyp.hotel.api.repository.RoomTypeRepo;
import com.fyp.hotel.api.repository.RoomRepo;

/**
 *
 * @author mct
 */
@RestController
public class BaseController {

    @Autowired
    LocalCache localCache;

    @Autowired
    HotelRepo hotelRepo;

    @Autowired
    PermissionRepo permissionRepo;

    @Autowired
    ProfileRepo profileRepo;

    @Autowired
    ReportRepo reportRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    ReservationRepo reservationRepo;

    @Autowired
    RoomTypeRepo roomTypeRepo;

    @Autowired
    TransactionCodeRepo transactionCodeRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoomServiceRepo roomServiceRepo;

    @Autowired
    RoomRepo roomRepo;

    @Autowired
    FolioTransactionRepo folioTransactionRepo;

    @Autowired
    CommentRepository commentRepository;
    
     @Autowired
     ContactRepo contactRepo;

}
