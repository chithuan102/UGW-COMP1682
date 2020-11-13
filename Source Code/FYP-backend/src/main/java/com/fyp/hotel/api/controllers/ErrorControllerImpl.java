/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.controllers;

import com.fyp.hotel.api.dto.ResultCode;
import com.fyp.hotel.api.dto.ResultEnt;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mct
 */
@RestController
@CrossOrigin("*")
public class ErrorControllerImpl implements ErrorController {

    @RequestMapping("/error")
    @ResponseBody
    public ResultEnt handleError(HttpServletRequest request) {
        Object error = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (error != null) {
            int code = NumberUtils.toInt(error.toString(), 0);
            ResultCode errorCode = ResultCode.valueOf(code);
            switch (errorCode) {
                case NOT_FOUND:
                    return ResultEnt.NOT_FOUND;
                case UNAUTHORIZED:
                  return ResultEnt.UNAUTHORIZED;
                case INTERNAL_ERROR:
                    return ResultEnt.INTERNAL_ERROR;
                case PERMISSION_DENY:
                     return ResultEnt.PERMISSION_DENY;
            }
        }
        return ResultEnt.NOT_FOUND;
    }

    @Override
    public String getErrorPath() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
