package com.okestro.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.secure.JwtProvider;
import com.okestro.secure.filter.JwtAuthorizationFilter;
import com.okestro.secure.filter.JwtFilter;
import com.okestro.secure.filter.VerifyUserFilter;
import com.okestro.user.service.UserService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean<Filter> verifyUserFilter(ObjectMapper mapper, UserService userService) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new VerifyUserFilter(mapper,userService));
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/api/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter(JwtProvider provider, ObjectMapper mapper, UserService userService) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter(provider,mapper,userService));
        filterRegistrationBean.setOrder(2);
        filterRegistrationBean.addUrlPatterns("/api/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtAuthorizationFilter(JwtProvider provider, ObjectMapper mapper) {
        FilterRegistrationBean<Filter> filterRegistrationBean = new
                FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthorizationFilter(provider,mapper));
        filterRegistrationBean.setOrder(2);
        return filterRegistrationBean;
    }
}