/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.FolioTransaction;
import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.ReservationStatus;
import com.fyp.hotel.api.ent.Room;
import com.fyp.hotel.api.ent.RoomService;
import com.fyp.hotel.api.ent.RoomStatus;
import com.fyp.hotel.api.ent.RoomType;
import com.fyp.hotel.api.ent.TransactionCode;
import com.fyp.hotel.api.models.ChangeRoomRequest;
import com.fyp.hotel.api.models.CreateReservationRequest;
import com.fyp.hotel.api.models.AddGuestRequest;
import com.fyp.hotel.api.models.FolioTransactionRequest;
import com.fyp.hotel.api.models.PaymentInfo;
import com.fyp.hotel.api.models.RoomTypeRequest;
import com.fyp.hotel.api.services.BaoKimClient;
import com.ygame.framework.utils.DateTimeUtils;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@RequestMapping("/reservation")
@Slf4j
@CrossOrigin("*")
public class ReservationController extends BaseController {

    @Autowired
    BaoKimClient baoKimClient;

    List<ReservationStatus> resStatusNotAvailable = Arrays.asList(ReservationStatus.INHOUSE, ReservationStatus.ARRIVAL, ReservationStatus.PENDING);

    @RequestMapping(path = "/{id}", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getById(@PathVariable("id") long id) {
        return ResultEnt.ofSuccess(reservationRepo.findById(id).get());
    }

    @RequestMapping(path = "", method = {RequestMethod.GET, RequestMethod.OPTIONS})
    public ResultEnt getByAll() {
        List<Reservation> reservations = reservationRepo.findAll();
        for (Reservation reservation : reservations) {
            if (reservation.getMainGuestId() > 0) {
                Profile profile = profileRepo.findById(reservation.getMainGuestId()).get();
                reservation.setGuestName(profile.getLastName() + ' ' + profile.getFirstName());
            }
            RoomType roomType = roomTypeRepo.findById(reservation.getRoomId()).get();
            reservation.setRoomName(roomType.getTitle());
        }
        return ResultEnt.ofSuccess(reservationRepo.findAll());
    }

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createReservation(@RequestBody CreateReservationRequest request) {
        double totalPrice = 0;
        String transId = "";
        for (RoomTypeRequest object : request.getRooms()) {
            for (int i = 0; i < object.getTotalSelected(); i++) {
                List<Room> rooms = roomRepo.findAll();

                List<Reservation> lstReservation = reservationRepo
                        .findRervationAvailable(request.getArrivalDate(), request.getDepartureDate());
                List<Room> roomAvailable = new ArrayList<>();
                List<Long> roomIds = lstReservation.stream().filter(x -> resStatusNotAvailable.contains(x.getReservationStatus())).map(Reservation::getRoomId).collect(Collectors.toList());
                for (Room room : rooms) {
                    if (!roomIds.contains(room.getId())) {
                        roomAvailable.add(room);
                    }
                }
                roomAvailable = roomAvailable.stream().filter(room -> room.getRoomType().getMaxOccupancy() >= request.getNoOfGuest() && room.isDisabled() == false).collect(Collectors.toList());

                List<Room> lstRooms = roomAvailable.stream().filter(x -> x.getRoomType().getId() == object.getId()).collect(Collectors.toList());
                Room room = lstRooms.stream().findFirst().orElse(new Room());
                if (room.getId() == 0) {
                    return ResultEnt.ofInvalid("No room available");
                }
                RoomType roomType = roomTypeRepo.findById(object.getId()).get();
                roomType.increaseTotalBooked();
                roomTypeRepo.save(roomType);
                Reservation reservation = new Reservation();
                reservation.setAmount(0);
                reservation.setPrice(0);
                reservation.setNotes(request.getNotes());
                reservation.setExpirationDate(request.getExpirationDate());
                reservation.setPaymentType(request.getPaymentType());

                reservation.setCardNumber(request.getCardNumber());
                reservation.setArrivalDate(getStartOfDate(request.getArrivalDate()));
                reservation.setDepartureDate(getEndOfDate(request.getDepartureDate()));

                reservation.setNumberOfAdult(request.getNoOfGuest());
                reservation.setMainGuestId(request.getMainGuestId());
                if (reservation.getMainGuestId() == 0) {
                    reservation.setGuestName(request.getUserInfo().getLastName().concat(' ' + request.getUserInfo().getFirstName()));
                    reservation.setPhoneNumber(request.getUserInfo().getPhoneNumber());
                    reservation.setEmail(request.getUserInfo().getEmail());

                }
                reservation.setNotes(request.getNotes());
                reservation.setReservationStatus(ReservationStatus.ARRIVAL);
                reservation.setOccupancy(roomType.getMaxOccupancy());
                int dateDelta = daysBetween(request.getArrivalDate(), request.getDepartureDate());
                List<Date> dateBetween = daysBetween2(request.getArrivalDate(), request.getDepartureDate());
                reservation.setAmount(roomType.getPrice() * dateBetween.size());
                reservation.setPrice(roomType.getPrice());
                reservation.setRoomId(room.getId());
//                room.setRoomStatus(RoomStatus.BOOKED);
                reservation.setId(System.currentTimeMillis());
                reservation = reservationRepo.save(reservation);
                TransactionCode depositCode = transactionCodeRepo.findById(2L).get();
                TransactionCode roomCharge = transactionCodeRepo.findById(1L).get();
                TransactionCode roomServiceCode = transactionCodeRepo.findById(3L).get();

                List<FolioTransaction> folioTransactions = new ArrayList<>();
                DecimalFormat decimalFormat = new DecimalFormat("0.000");
                double depositAmount = (reservation.getAmount()* 10.0) / 100;
                folioTransactions.add(new FolioTransaction(depositCode.getId(), -(depositAmount), "Paid 10% room charge", depositCode.getName(), depositCode.getType().name(), reservation));

                for (Date date : dateBetween) {
                    folioTransactions.add(new FolioTransaction(roomCharge.getId(), roomType.getPrice(), "Room charge" + " - Date: " + DateTimeUtils.toString(date, "yyyy-MM-dd"), roomCharge.getTitle(), roomCharge.getType().name(), reservation));
                    for (RoomService roomService : roomType.getRoomServices()) {
                        folioTransactions.add(new FolioTransaction(roomServiceCode.getId(), 0, roomService.getTitle() + " - Date: " + DateTimeUtils.toString(date, "yyyy-MM-dd"), roomServiceCode.getTitle(), roomServiceCode.getType().name(), reservation));
                    }
                }

                for (FolioTransaction folioTransaction : folioTransactions) {
                    folioTransactionRepo.save(folioTransaction);
                }
                reservation.setTransactions(folioTransactions);
                totalPrice += depositAmount;
                if (request.isUseBaokim()) {
                    reservation.setReservationStatus(ReservationStatus.PENDING);
                    reservationRepo.save(reservation);
                }
                if (transId.isEmpty()) {
                    transId = transId.concat("" + reservation.getId());
                } else {
                    transId = transId.concat("_" + reservation.getId());
                }
            }
        }
        if (request.isUseBaokim()) {
            PaymentInfo info = new PaymentInfo();
            info.setTransId(transId);
            info.setAmount(totalPrice);
            return ResultEnt.ofSuccess(baoKimClient.baokimCharge(info));
        }
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt updateReservation(@RequestBody Reservation request) {
        Reservation reservation = reservationRepo.findById(request.getId()).orElse(new Reservation());
        if (reservation.getId() > 0) {
            reservation.setGuests(request.getGuests());
            reservation.setReservationStatus(request.getReservationStatus());
            reservation.setMainGuestId(request.getMainGuestId());
            reservation.setNumberOfAdult(request.getNumberOfAdult());
            reservation.setNumberOfChildren(request.getNumberOfChildren());
            reservation.setRoomId(request.getRoomId());
            reservation.setTransactions(request.getTransactions());
            reservationRepo.save(reservation);
            return ResultEnt.SUCCESS;
        }

        return ResultEnt.BAD_REQUEST;
    }

    @RequestMapping(path = "/checkout/{reservationId}", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt checkout(@PathVariable("reservationId") long id) {
        Reservation reservation = reservationRepo.findById(id).orElse(new Reservation());
        if (reservation.getId() > 0) {
            reservation.setReservationStatus(ReservationStatus.CHECKOUT);
            reservation.setCheckOutDate(DateTimeUtils.getNow("yyyy-MM-dd"));
            reservationRepo.save(reservation);
            Room room = roomRepo.findById(reservation.getRoomId()).get();
            room.setRoomStatus(RoomStatus.AVAILABLE);
            roomRepo.save(room);
        }
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/checkin/{reservationId}", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt checkin(@PathVariable("reservationId") long id) {
        Reservation reservation = reservationRepo.findById(id).orElse(new Reservation());
        if (reservation.getId() > 0) {
            reservation.setReservationStatus(ReservationStatus.INHOUSE);
            reservation.setCheckInDate(DateTimeUtils.getNow("yyyy-MM-dd"));
            Room room = roomRepo.findById(reservation.getRoomId()).get();
            if (room.getRoomStatus() == RoomStatus.BOOKED) {
                return ResultEnt.ofInvalid("This room not available at the moment. Please choose another room.");
            }
            room.setRoomStatus(RoomStatus.BOOKED);
            roomRepo.save(room);
            reservationRepo.save(reservation);
        }
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/cancalled", method = {RequestMethod.PUT, RequestMethod.OPTIONS})
    public ResultEnt cancelled(@RequestBody Reservation request) {
        Reservation reservation = reservationRepo.findById(request.getId()).orElse(new Reservation());
        if (reservation.getId() > 0) {
            reservation.setReservationStatus(ReservationStatus.CANCELLED);
            reservationRepo.save(reservation);
            return ResultEnt.SUCCESS;
        }
        return ResultEnt.BAD_REQUEST;
    }

    @RequestMapping(path = "/change-room", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt changeRooom(@RequestBody ChangeRoomRequest request) {
        Room room = roomRepo.findById(request.getRoomId()).get();
        if (room.getRoomStatus() == RoomStatus.BOOKED) {
            return ResultEnt.ofInvalid("This room not available at the moment. Please choose another room.");
        }
        Reservation reservation = reservationRepo.findById(request.getReservationId()).orElse(new Reservation());
        if (reservation.getId() > 0) {
            reservation.setRoomId(room.getId());
            reservationRepo.save(reservation);
            return ResultEnt.SUCCESS;
        }
        return ResultEnt.BAD_REQUEST;
    }
    
    @RequestMapping(path = "/add-guest", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt addGuest(@RequestBody AddGuestRequest request) {
        System.out.println(request.getReservationId());
        Reservation reservation = reservationRepo.findById(request.getReservationId()).orElse(new Reservation());
        if(reservation.getId() == 0){
            return ResultEnt.BAD_REQUEST;
        }
        if(request.getGuests().size() > 0){
             for (Long guestId : request.getGuests()) {
            Profile guest = profileRepo.findById(guestId).get();
            reservation.getGuests().add(guest);
        }
        }else{
            reservation.setGuests(new ArrayList<>());
        }
       
        reservationRepo.save(reservation);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/{id}", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt getReservation(@PathVariable("id") long id) {
        Reservation reservation = reservationRepo.findById(id).get();
        return ResultEnt.ofSuccess(reservation);
    }

    public int daysBetween(Date d1, Date d2) {
        return (int) ((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    }

    public static List<Date> daysBetween2(
            Date startDate, Date endDate) {
        List<Date> datesInRange = new ArrayList<>();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(startDate);

        Calendar endCalendar = new GregorianCalendar();
        endCalendar.setTime(endDate);

        while (calendar.before(endCalendar)) {
            Date result = calendar.getTime();
            datesInRange.add(result);
            calendar.add(Calendar.DATE, 1);
        }
        Date result = calendar.getTime();
        datesInRange.add(result);
        return datesInRange;
    }

    @RequestMapping(path = "/transaction", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt createReservationTransaction(@RequestBody FolioTransactionRequest request) {
        FolioTransaction folioTransaction = new FolioTransaction();
        folioTransaction.setDescription(request.getDescription());
        folioTransaction.setPrice(request.getPrice());
        folioTransaction.setReservation(request.getReservation());
        folioTransaction.setTransactionCode(request.getTransactionCode());
        folioTransaction.setTransactionCodeId(request.getTransactionCodeId());
        folioTransaction.setType(request.getType());

        folioTransactionRepo.save(folioTransaction);
        return ResultEnt.SUCCESS;
    }

    @RequestMapping(path = "/transaction/{id}", method = {RequestMethod.DELETE, RequestMethod.OPTIONS})
    public ResultEnt deleteTransaction(@PathVariable("id") long id) {
        folioTransactionRepo.deleteById(id);
        return ResultEnt.SUCCESS;
    }

    public static Date getStartOfDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeZone(TimeZone.getTimeZone("GMT+7:00"));
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    public static Date getEndOfDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTimeZone(TimeZone.getTimeZone("GMT+7:00"));
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

}
