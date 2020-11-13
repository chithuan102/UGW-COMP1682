/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fyp.hotel.api.dto.ResultEnt;
import com.fyp.hotel.api.ent.Comment;
import com.fyp.hotel.api.ent.FolioTransaction;
import com.fyp.hotel.api.ent.Profile;
import com.fyp.hotel.api.ent.Reservation;
import com.fyp.hotel.api.ent.ReservationStatus;
import com.fyp.hotel.api.models.ReportRequest;
import com.google.gson.JsonObject;
import com.ygame.framework.utils.DateTimeUtils;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@Slf4j
@RequestMapping("/report")
@CrossOrigin("*")
public class ReportController extends BaseController {

    public final ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(path = "", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt getReport(@RequestBody ReportRequest request) {
        ObjectNode jsonObject = mapper.createObjectNode();

        switch (request.getType()) {
            case "SUMMARY":

                List<Reservation> listReservation = reservationRepo.findByArrivalDateBetweenOrderByCreatedTimeAsc(DateTimeUtils.getBeginDate(request.getFromDate()), request.getToDate());
                jsonObject.put("total_booking", listReservation.size());
                jsonObject.put("total_arrival", listReservation.size());
                long totalInhouse = listReservation.stream()
                        .filter(x -> x.getReservationStatus() == ReservationStatus.INHOUSE || x.getReservationStatus() == ReservationStatus.CHECKOUT).count();
                jsonObject.put("total_inhouse", totalInhouse);
                long totalCheckout = listReservation.stream()
                        .filter(x -> x.getReservationStatus() == ReservationStatus.CHECKOUT).count();
                jsonObject.put("total_checkout", totalCheckout);
                long totalCancelled = listReservation.stream()
                        .filter(x -> x.getReservationStatus() == ReservationStatus.CANCELLED).count();
                jsonObject.put("total_cancelled", totalCancelled);
                List<Profile> profiles = profileRepo.findByCreatedTimeBetween(request.getFromDate(), request.getToDate());
                jsonObject.put("total_new_guest", profiles.size());
                List<Comment> comments = commentRepository.findByCreatedTimeBetween(request.getFromDate(), request.getToDate());
                jsonObject.put("total_comment_create", comments.size());

                List<FolioTransaction> transactions = new ArrayList<>();
                listReservation.stream().forEach(x -> transactions.addAll(x.getTransactions()));
                double revernue = transactions.stream().filter(x -> x.getType().equals("PAYMENT")).mapToDouble(x -> x.getPrice()).sum();
                jsonObject.put("total_revenue", revernue);

                long totalServiceUsed = transactions.stream().filter(x -> x.getType().equals("SERVICE")).count();
                jsonObject.put("total_service_used", totalServiceUsed);

                return ResultEnt.ofSuccess(jsonObject);
            case "TRANSACTION":
                listReservation = reservationRepo.findByArrivalDateBetweenOrderByCreatedTimeAsc(DateTimeUtils.getBeginDate(request.getFromDate()), request.getToDate());
                return ResultEnt.ofSuccess(listReservation);
            case "7_DAYS":
                List<Date> listDate = lastDate7days();
                ArrayNode arrayNode = mapper.createArrayNode();
                for (Date date : listDate) {
                    ObjectNode reportDays = mapper.createObjectNode();
                    List<FolioTransaction> transaction7days = folioTransactionRepo.findByCreatedTime(date);
                    reportDays.put("date", DateTimeUtils.toString(date, "yyyy-MM-dd"));
                    double revenueByDate = transaction7days.stream().filter(x -> x.getType().equals("PAYMENT")).mapToDouble(y->y.getPrice()).sum() * -1;
                    reportDays.put("revenue", revenueByDate);
                    arrayNode.add(reportDays);

                }
                return ResultEnt.ofSuccess(arrayNode);
            case "30_DAYS":
                List<Date> listDate2 = lastDate30days();
                ArrayNode arrayNode2 = mapper.createArrayNode();
                for (Date date : listDate2) {
                    ObjectNode reportDays = mapper.createObjectNode();
                    List<FolioTransaction> transaction30days = folioTransactionRepo.findByCreatedTime(date);
                    reportDays.put("date", DateTimeUtils.toString(date, "yyyy-MM-dd"));
                    double revenueByDate = transaction30days.stream().filter(x -> x.getType().equals("PAYMENT")).mapToDouble(y->y.getPrice()).sum() * -1;
                    reportDays.put("revenue", revenueByDate);
                    arrayNode2.add(reportDays);

                }
                return ResultEnt.ofSuccess(arrayNode2);
        }
        return ResultEnt.BAD_REQUEST;
    }

    public static List<Date> lastDate7days() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, -7);
        List<Date> listDate = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            cal.add(Calendar.DAY_OF_YEAR, 1);
            listDate.add(cal.getTime());
        }
        return listDate;
    }
    
       public static List<Date> lastDate30days() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, -30);
        List<Date> listDate = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            cal.add(Calendar.DAY_OF_YEAR, 1);
            listDate.add(cal.getTime());
        }
        return listDate;
    }

    @RequestMapping(path = "/export", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResultEnt export(@RequestBody ReportRequest request) {

        return ResultEnt.BAD_REQUEST;
    }

}
