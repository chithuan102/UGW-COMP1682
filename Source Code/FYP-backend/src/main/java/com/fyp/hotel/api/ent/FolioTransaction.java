/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FolioTransaction extends MasterEnt {

    long transactionCodeId;

    double price;
    String description;
    String transactionCode;
    String type;

    @ManyToOne
    @JsonIgnoreProperties("transactions")
    private Reservation reservation;

}
