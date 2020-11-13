/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fyp.hotel.api.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
//import com.thuanmc.hotel.api.models.User;
import com.ygame.framework.utils.JSONUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author mct
 */
@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
@Slf4j
public class LocalCache {

    private final Cache<String, String> cache = Caffeine.newBuilder().expireAfterAccess(3, TimeUnit.HOURS).build();

    public void set(String key, String value) {
        cache.put(key, value);
    }

    public String get(String key) {
        return cache.getIfPresent(key);
    }
    
     public void remove(String key) {
        cache.invalidate(key);
    }
}
