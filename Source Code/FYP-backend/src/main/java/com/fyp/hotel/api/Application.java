/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

/**
 *
 * @author mct
 */
@SpringBootApplication
@Slf4j
public class Application {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        try {
            ApplicationContext applicationContext =  SpringApplication.run(Application.class, args);
//            BaoKimClient baoKimClient = applicationContext.getBean(BaoKimClient.class);
//            baoKimClient.baokimCharge();
        } catch (Exception e) {
            log.error(ExceptionUtils.getStackTrace(e));
        }
    }
}
