/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.ent;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 *
 * @author mct
 */
@Entity
@Data
public class Reservation implements Serializable {
    
    @Id
    protected long id;
    
    @CreationTimestamp
    protected Timestamp createdTime;

    @UpdateTimestamp
    protected Timestamp updatedTime;
    
    
    
    private boolean disabled;

    private String title;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date arrivalDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date departureDate;
    int occupancy;
    int numberOfAdult;
    int numberOfChildren;
    String paymentType;
    String expirationDate;
    String cardNumber;
    long amount;
    long price;
    String notes;
    String guestName;
    String phoneNumber;
    String email;
    String roomName;
    String checkInDate;
    String checkOutDate;

    @NotNull
    long roomId;

    @Enumerated(EnumType.STRING)
    ReservationStatus reservationStatus;

    long mainGuestId;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "reservation_guest",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "guest_id"))
    private List<Profile> guests;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.PERSIST)
    private List<FolioTransaction> transactions;
}
