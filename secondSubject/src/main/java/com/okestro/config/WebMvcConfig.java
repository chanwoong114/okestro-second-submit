package com.okestro.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.secure.JwtProvider;
import com.okestro.secure.filter.JwtAuthorizationFilter;
import com.okestro.user.service.UserService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("OPTIONS", "HEAD", "GET", "PATCH", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .maxAge(3600);
    }

}
