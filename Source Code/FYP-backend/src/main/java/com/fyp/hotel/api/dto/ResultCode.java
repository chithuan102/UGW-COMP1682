package com.fyp.hotel.api.dto;

import java.util.Arrays;

public enum ResultCode {

    SUCCESS(200),
    BAD_REQUEST(400),
    UNAUTHORIZED(401),
    PERMISSION_DENY(403),
    NOT_FOUND(404),
    INTERNAL_ERROR(500),
    BAD_GATEWAY(502),
    SERVICE_UNAVAILABLE(503),
    GATEWAY_TIMEOUT(504),
    ;




    Integer code;
    ResultCode(Integer code) {
        this.code = code;
    }

    public Integer code() {
        return this.code;
    }
    
      public static ResultCode valueOf(int value) {
    return Arrays.stream(ResultCode.values())
        .filter(v -> v.code() == value).findFirst().get();
  }
}
