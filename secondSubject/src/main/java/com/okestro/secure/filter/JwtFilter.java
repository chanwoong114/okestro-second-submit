package com.okestro.secure.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.secure.Jwt;
import com.okestro.secure.JwtProvider;
import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtFilter implements Filter {

    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserService userService;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException {
        Object attribute = request.getAttribute(VerifyUserFilter.AUTHENTICATE_USER);
        if (attribute instanceof AuthenticationUser) {
            AuthenticationUser authenticationUser = (AuthenticationUser) attribute;
            Map<String, Object> claims = new HashMap<>();
            String authenticationUserJson = objectMapper.writeValueAsString(authenticationUser);
            claims.put(VerifyUserFilter.AUTHENTICATE_USER, authenticationUserJson);
            Jwt jwt = jwtProvider.createJwt(claims);
            userService.updateRefreshToken(authenticationUser.getEmail(), jwt.getRefreshToken());
            String json = objectMapper.writeValueAsString(jwt);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }

        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value());
    }
}
