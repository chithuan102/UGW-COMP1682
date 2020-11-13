package com.fyp.hotel.api.models;

import lombok.Data;


@Data
public class PaymentInfo {

    private String transId;
    private String transRef;
    private String service;
    private double amount;
    private String username;
    private String transPartner = "";
    private int status;
  
}
