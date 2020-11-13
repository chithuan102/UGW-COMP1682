/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import lombok.Data;

/**
 *
 * @author mct
 */
@Entity
@Data
public class Permission extends MasterEnt{
    
    String code;
    
      @ManyToMany(mappedBy = "permissions")
    @JsonIgnore
      List<Role> roles;
    
}
