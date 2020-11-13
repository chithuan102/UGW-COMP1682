/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.models;

import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.Room;
import com.fyp.hotel.api.ent.RoomType;
import java.util.Date;
import java.util.List;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
public class CreateReservationRequest {

    String cardNumber;
    String expirationDate;
    String paymentType;
    int noOfGuest;
    Date arrivalDate;
    int mainGuestId;
    Date departureDate;
    List<RoomTypeRequest> rooms;
    Profile userInfo;
    String notes;
    boolean useBaokim;


}
