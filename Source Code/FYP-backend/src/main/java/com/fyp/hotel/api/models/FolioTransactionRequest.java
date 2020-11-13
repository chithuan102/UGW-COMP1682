/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.models;

import com.fyp.hotel.api.ent.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author mct
 */
@Data
public class FolioTransactionRequest{

    long transactionCodeId;

    double price;
    String description;
    String transactionCode;
    String type;
    private Reservation reservation;

}
