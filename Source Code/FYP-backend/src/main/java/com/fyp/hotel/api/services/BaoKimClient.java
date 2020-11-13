package com.fyp.hotel.api.services;

import com.fyp.hotel.api.models.PaymentInfo;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ygame.framework.utils.ConvertUtils;
import com.ygame.framework.utils.JSONUtil;
import com.ygame.framework.utils.NetworkUtils;
import io.fusionauth.jwt.Signer;
import io.fusionauth.jwt.domain.JWT;
import io.fusionauth.jwt.hmac.HMACSigner;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;


@Service
public class BaoKimClient {
    
    private static BaoKimClient instance;
    private String CALLBACK_URL = "http://localhost:4222/booking";
    private String NOTIFY_URL = "http://localhost:1998/payment/webhook";
    public static final String API_URL = "https://sandbox-api.baokim.vn";
    public static final String API_KEY = "a18ff78e7a9e44f38de372e093d87ca1";
    public static final String API_SECRET = "9623ac03057e433f95d86cf4f3bef5cc";

    public static synchronized BaoKimClient getInstance() {
        if (instance == null) {
            instance = new BaoKimClient();
        }
        return instance;
    }
    
    public String baokimCharge(PaymentInfo info){
        System.out.println(">>>>PAYMENT BAOKIM");
        int status = 0;
        String url = "";
        String transId = String.valueOf(System.currentTimeMillis());
        try{
            String lang = "vi";
//            if(paymentInfo.getGlobalCountry()>0)
//                lang = "en";
            int acceptBank = 1;
            int acceptQr = 1;
            int acceptCC = 0;
            int acceptEWallet = 0;
            int bpmId = 0;
            int value = ConvertUtils.toInt(112,0);
            if(value>0)
                bpmId = value;
//            if(paymentInfo.getMethod().equals("qr"))
//                bpmId = 297;
//            if(bankInfo.isVisa()){
//                acceptBank = 0;
//                acceptQr = 0;
//                acceptCC = 1;
//                bpmId = 128;
//            }

            Map<String,Object> mpParam = new LinkedHashMap<>();
            mpParam.put("mrc_order_id", info.getTransId());
            mpParam.put("total_amount", info.getAmount() *22300);
            mpParam.put("description", "order_"+info.getTransId());
            mpParam.put("url_success", CALLBACK_URL);
            mpParam.put("url_detail", CALLBACK_URL);
            mpParam.put("webhooks", NOTIFY_URL);
            mpParam.put("lang", lang);
            mpParam.put("accept_bank", acceptBank);
            mpParam.put("accept_cc", acceptCC);
            mpParam.put("accept_qrpay", acceptQr);
            mpParam.put("accept_e_wallet", acceptEWallet);
            if(bpmId>0)
                mpParam.put("bpm_id", bpmId);
            mpParam.put("customer_email", "Email_dang_ky_the_@gmail.com");
            mpParam.put("customer_phone", "0987654321");
//            LogUtil.printDebug(">>>>B0. PARAM: "+mpParam.toString());
            String tokenId = String.valueOf(System.currentTimeMillis());
            ZonedDateTime issuedAt = ZonedDateTime.now(ZoneOffset.UTC);
            ZonedDateTime notBefore = issuedAt;
            Signer signer = HMACSigner.newSHA256Signer(API_SECRET);
            JWT jwt = new JWT().setUniqueId(tokenId)
                               .setIssuer(API_KEY)
                               .setIssuedAt(issuedAt)
                               .setNotBefore(notBefore)
                               .setExpiration(issuedAt.plusSeconds(60));
            jwt.addClaim("form_params", mpParam);
            String token = JWT.getEncoder().encode(jwt, signer);
            System.out.println(">>>>B1. TOKEN: "+token);
            if(StringUtils.isNotBlank(token)){
                String link = API_URL+"/payment/api/v4/order/send?jwt="+token;
                System.out.println(">>>>B2. LINK: "+link);
                Map<String,String> header = new LinkedHashMap<>();
                System.out.println(">>>>B3. BEGIN CALL API");
                JsonObject param = JSONUtil.toJson(mpParam);
                System.out.println(link);
                System.out.println(param);
                String response = NetworkUtils.doPost(link, header, param);
                System.out.println(">>>>B4. END CALL API. RESPONSE: "+response);
                if(StringUtils.isNotBlank(response)){
                    JsonObject baokim = (JsonObject) new JsonParser().parse(response);
                    if(baokim!=null){
                        int code = baokim.get("code").getAsInt();
                        if(code==0){
                            status = 1;
                            JsonObject data = baokim.get("data").getAsJsonObject();
                            url = data.get("payment_url").getAsString();
                        }
                    }
                }
            }
        }
        catch(Exception ex){
//            LogUtil.printDebug("",ex);
        }
        JsonObject objRet = new JsonObject();
        objRet.addProperty("status", status);
        objRet.addProperty("url", url);
        objRet.addProperty("token", transId);
        System.out.println(">>>>B5. RESULT: "+objRet.toString());
        return url;
    }
    
}

