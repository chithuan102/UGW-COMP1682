/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.models;

import java.util.Date;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
public class RoomRequest {

    String roomCode;
    String roomStatus;
    int noOfGuest;
    Date arrivalDate;
    Date departureDate;
    long roomTypeId;

}
