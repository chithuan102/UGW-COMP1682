/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import lombok.Data;

/**
 *
 * @author mct
 */
@Entity
@Data
public class TransactionCode extends MasterEnt implements Serializable {
    
    @Enumerated(EnumType.STRING)
    TransacionCodeType type;
    
    String name;


}
