package com.fyp.hotel.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResultEnt<T> {
    @JsonIgnore
    private ResultCode result;

    private String message;
    private Integer code;
//    private String requestId = UUID.randomUUID().toString();

    @Value("${service.version}")
    private static String version;


    @Value("${service.name}")
    private static String apiName;

    private T data;
    private List<ErrorInfo> errors;

    public static ResultEnt SUCCESS  = new ResultEnt(ResultCode.SUCCESS);
    public static ResultEnt NOT_FOUND  = new ResultEnt(ResultCode.NOT_FOUND);
    public static ResultEnt BAD_REQUEST  = new ResultEnt(ResultCode.BAD_REQUEST);
    public static ResultEnt INTERNAL_ERROR  = new ResultEnt(ResultCode.INTERNAL_ERROR);
    public static ResultEnt UNAUTHORIZED  = new ResultEnt(ResultCode.UNAUTHORIZED);
    public static ResultEnt PERMISSION_DENY  = new ResultEnt(ResultCode.PERMISSION_DENY);


    public static ResultEnt ofSuccess(Object data) {
        return new ResultEnt(ResultCode.SUCCESS, data);
    }
    
     public static ResultEnt ofInvalid(String message) {
        return new ResultEnt(ResultCode.BAD_REQUEST, message);
    }
     
    public static ResultEnt ofInvalid(Object message) {
        return new ResultEnt(ResultCode.BAD_REQUEST, message);
    }

    public ResultEnt(){};

    public ResultEnt(ResultCode result) {
        this.result = result;
        this.message = result.name();
        this.code = result.code();
    }

    public ResultEnt(ResultCode result, String message) {
        this.result = result;
        this.message = message;
        this.code = result.code();
    }

    public ResultEnt(ResultCode result, T data) {
        this.result = result;
        this.message = result.name();
        this.code = result.code();
        this.data = data;
    }

    public ResultEnt(ResultCode result, String message, T data) {
        this.result = result;
        this.message = message;
        this.code = result.code();
        this.data = data;
    }

    @JsonIgnore
    public boolean isSuccess() {
        return ResultCode.SUCCESS.code.equals(code) || result == ResultCode.SUCCESS;
    }

    @JsonIgnore
    public boolean isFailure() {
        return !isSuccess();
    }

    public void addError(ErrorInfo errorInfo){
        if(errors == null){
            errors = new ArrayList<>();
        }
        errors.add(errorInfo);
    }

    public List<ErrorInfo> getErrors(){
        return errors;
    }

    public ResultEnt setResult(ResultCode result) {
        this.result = result;
        this.code = result.code;
        return this;
    }

    @Data
    @AllArgsConstructor
    public static class ErrorInfo {
        private Integer code;
        private String message;
    }
}
