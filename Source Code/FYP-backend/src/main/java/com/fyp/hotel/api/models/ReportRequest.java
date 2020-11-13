/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.models;

import java.util.Date;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
public class ReportRequest {

    String type;
    Date fromDate;
    Date toDate;
    String transactionType;
    Date date;

}
