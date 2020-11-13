/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.utils;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 *
 * @author mct
 */
@Component
public class SendMailUtils {

    private static final String PASSWORD = "Thuan123!@#";
    private static final String FROM = "pleasedonotreply.notify@gmail.com";

    public static void sendMailActive(String title, String url, String email, String name) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            @Override
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(FROM, PASSWORD);
            }
        });
        try {
            String to = email;
            MimeMessage message = new MimeMessage(session);
            message.setHeader("Content-Type", "text/html; charset=\"utf-8\"");
            message.setFrom(new InternetAddress(FROM));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(title, "UTF-8");
            Multipart mp = new MimeMultipart();
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(convertToBodyActive(url, name), "text/html; charset=utf-8");
            mp.addBodyPart(htmlPart);
            message.setContent(mp);
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private static String convertToBodyActive(String url, String name) {
        name = StringUtils.isEmpty(name) ? "UNKNOWN" : name;
        return "Thanks " + name + " for registration. This is your activation link. Please click link below to active your account:\n"
                + url + "\n"
                + "This link will expire after 2 hours.";
    }

}
