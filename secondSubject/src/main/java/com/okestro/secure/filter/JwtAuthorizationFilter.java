package com.okestro.secure.filter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okestro.secure.JwtProvider;
import com.okestro.secure.dto.AuthenticationUser;
import com.okestro.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter implements Filter {

    private final String[] whiteList = new String[]{"/api/user/login", "/v3/**",
            "/swagger*", "/api/user/sign-up", "/api/auth/**",
    "/api/board/get/**"};
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    public static final String AUTHENTICATE_USER = "jwt-secret";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        if(whiteListCheck(httpServletRequest.getRequestURI())){
            chain.doFilter(request, response);
            return;
        }
        if(!isContainToken(httpServletRequest)){
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(),"인증 오류");
            return;
        }
        try{
            String token = getToken(httpServletRequest);
            AuthenticationUser authenticateUser = getAuthenticationUser(token);
            log.info("값 : {}",authenticateUser.getEmail());
            request.setAttribute("authenticateUser", authenticateUser);
            chain.doFilter(request, response);
        } catch (JsonParseException e){
            log.error("JsonParseException");
            httpServletResponse.sendError(HttpStatus.BAD_REQUEST.value());
        } catch (MalformedJwtException | UnsupportedJwtException e){
            log.error("JwtException");
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "인증 오류");
        } catch (ExpiredJwtException e){
            log.error("JwtTokenExpired");
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value(), "토큰이 만료 되었습니다");
        }

    }

    private boolean whiteListCheck(String uri) {
        return PatternMatchUtils.simpleMatch(whiteList, uri);
    }

    private boolean isContainToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        return authorization != null && authorization.startsWith("Bearer ");
    }

    private String getToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        return authorization.substring(7);
    }

    private AuthenticationUser getAuthenticationUser(String token) throws JsonProcessingException {
        Claims claims = jwtProvider.getClaims(token);
        String authenticateUserJson = claims.get(AUTHENTICATE_USER, String.class);
        return objectMapper.readValue(authenticateUserJson, AuthenticationUser.class);
    }
}
