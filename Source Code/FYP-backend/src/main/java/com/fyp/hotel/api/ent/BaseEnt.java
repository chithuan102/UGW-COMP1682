/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 *
 * @author mct
 */
@MappedSuperclass
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class BaseEnt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;
    
    @CreationTimestamp
    @Temporal(javax.persistence.TemporalType.DATE)
    protected Date createdTime;

    @UpdateTimestamp
    @Temporal(javax.persistence.TemporalType.DATE)
    protected Date updatedTime;
    
    
    
    private boolean disabled;

    private String title;

}
