package com.chen_yonati.notes_keeper.filters;

import com.chen_yonati.notes_keeper.model.User;
import com.chen_yonati.notes_keeper.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class SecurityRequestFilter extends OncePerRequestFilter {

    @Autowired
    private AppService appService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURL().toString().endsWith("/login") || request.getRequestURL().toString().endsWith("/register")
                || request.getRequestURL().toString().endsWith("/me")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Token");
        User current = appService.findByToken(token);
        if(current != null) {
            request.setAttribute("user", current);
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getOutputStream().flush();
            return;
        }

    }
}
