package com.fyp.hotel.api.models;

import com.fyp.hotel.api.models.PaymentInfo;

public class PaymentBank extends PaymentInfo{

    private int bankId;
    private String type;
    private String data;
    private String callbackUrl;
    private String currency = "vnd";
    private String lang = "";
    private int globalCountry;
    private int globalCurrency;
    private int globalPaymentType;
    private String redirectUrl;
    private String method;

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getCallbackUrl() {
        return callbackUrl;
    }

    public void setCallbackUrl(String callbackUrl) {
        this.callbackUrl = callbackUrl;
    }

    public int getBankId() {
        return bankId;
    }

    public void setBankId(int bankId) {
        this.bankId = bankId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public int getGlobalCountry() {
        return globalCountry;
    }

    public void setGlobalCountry(int globalCountry) {
        this.globalCountry = globalCountry;
    }

    public int getGlobalCurrency() {
        return globalCurrency;
    }

    public void setGlobalCurrency(int globalCurrency) {
        this.globalCurrency = globalCurrency;
    }

    public int getGlobalPaymentType() {
        return globalPaymentType;
    }

    public void setGlobalPaymentType(int globalPaymentType) {
        this.globalPaymentType = globalPaymentType;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
