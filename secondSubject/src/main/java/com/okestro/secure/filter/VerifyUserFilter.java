package com.okestro.secure.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.secure.dto.LoginUserRequest;
import com.okestro.secure.dto.VerifyUser;
import com.okestro.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class VerifyUserFilter implements Filter {
    public static final String AUTHENTICATE_USER = "authenticationKey";
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        if (httpServletRequest.getMethod().equals("POST")) {

            try {
                LoginUserRequest loginUserRequest = objectMapper.readValue(request.getReader(), LoginUserRequest.class);
                VerifyUser verifyUser = userService.verifyUser(loginUserRequest);
                if (verifyUser.isValid()) {
                    request.setAttribute(AUTHENTICATE_USER, new AuthenticationUser(loginUserRequest.getEmail(), verifyUser.getUserId()));
                } else {
                    throw new IllegalArgumentException();
                }
                chain.doFilter(request, response);
            } catch (Exception e) {
                log.error("Fail User Verify");
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
            }
        }
    }
}
