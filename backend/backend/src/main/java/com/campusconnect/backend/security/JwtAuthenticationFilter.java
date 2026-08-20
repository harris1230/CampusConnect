package com.campusconnect.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println();
        System.out.println("========================================");
        System.out.println("🔥 JWT FILTER IS RUNNING 🔥");
        System.out.println("METHOD: " + request.getMethod());
        System.out.println("URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header: " + authHeader);

        // No JWT token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("⚠️ NO JWT TOKEN FOUND");
            System.out.println("========================================");

            filterChain.doFilter(request, response);
            return;
        }

        // Remove "Bearer "
        String token = authHeader.substring(7);

        System.out.println("Token received: YES");

        try {

            // Extract information from JWT
            String email = jwtService.extractEmail(token);
            String role = jwtService.extractRole(token);

            System.out.println("Email: " + email);
            System.out.println("Role: " + role);

            // Only authenticate if there isn't already an authentication
            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                // Validate JWT
                boolean valid = jwtService.isTokenValid(token, email);

                System.out.println("JWT Valid: " + valid);

                if (valid) {

                    // Create Spring Security authority
                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority("ROLE_" + role);

                    // Create authentication object
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(authority)
                            );

                    // Put authentication into SecurityContext
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println("✅ AUTHENTICATION SET");
                    System.out.println(
                            "Authenticated User: " +
                            authentication.getName()
                    );
                    System.out.println(
                            "Authorities: " +
                            authentication.getAuthorities()
                    );

                } else {

                    System.out.println("❌ JWT IS INVALID");

                }

            } else {

                System.out.println(
                        "⚠️ Email is null OR user is already authenticated"
                );
            }

        } catch (Exception e) {

            System.out.println("❌ JWT ERROR: " + e.getMessage());
            e.printStackTrace();
        }

        // Check final authentication
        System.out.println(
                "FINAL AUTHENTICATION: " +
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
        );

        System.out.println("========================================");
        System.out.println();

        // Continue request
        filterChain.doFilter(request, response);
    }
}