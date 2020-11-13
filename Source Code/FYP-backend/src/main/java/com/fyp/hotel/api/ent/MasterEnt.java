/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import javax.persistence.MappedSuperclass;
import lombok.Data;

/**
 *
 * @author mct
 */
@Data
@MappedSuperclass
public abstract class MasterEnt extends BaseEnt{
    
//    public long propertyId;
}
