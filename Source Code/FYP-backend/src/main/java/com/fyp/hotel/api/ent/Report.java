/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import javax.persistence.Entity;
import lombok.Data;

/**
 *
 * @author mct
 */
@Entity
@Data
public class Report extends MasterEnt{
    
    String date;
    String type;
    
}
