package com.morrocco_drive_morrocco_drive_backend.config;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.morrocco_drive_morrocco_drive_backend.filter.JwtAuthenticationFilter;
import com.morrocco_drive_morrocco_drive_backend.service.CustomUserDetailsService;
import com.morrocco_drive_morrocco_drive_backend.util.JwtAuthenticationEntryPoint;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return SecurityChainBuilder.builder(http)
                .disableCsrf()
                .addCorsConfiguration(createCorsConfiguration())
                .authorizeRequests()
                .addSessionManagement()
                .addExceptionHandling(jwtAuthenticationEntryPoint)
                .addJwtFilter(jwtAuthenticationFilter)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    private CorsConfigurationSource createCorsConfiguration() {
        return request -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(List.of("http://localhost:3000", "https://ride-fast.vercel.app/"));
            cfg.addAllowedMethod("*");
            cfg.setAllowCredentials(true);
            cfg.addAllowedHeader("*");
            cfg.addExposedHeader("Authorization");
            cfg.setMaxAge(3600L);
            return cfg;
        };
    }
}

// Builder Class for SecurityFilterChain
class SecurityChainBuilder {

    private final HttpSecurity http;

    private SecurityChainBuilder(HttpSecurity http) {
        this.http = http;
    }

    public static SecurityChainBuilder builder(HttpSecurity http) {
        return new SecurityChainBuilder(http);
    }

    public SecurityChainBuilder disableCsrf() throws Exception {
        http.csrf().disable();
        return this;
    }

    public SecurityChainBuilder addCorsConfiguration(CorsConfigurationSource corsConfigurationSource) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource));
        return this;
    }

    public SecurityChainBuilder authorizeRequests() throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN") // Added Admin Role Authorization
                .requestMatchers("/api/v1/auth/**", "/swagger-ui/**", "/home").permitAll()
                .anyRequest().authenticated());
        return this;
    }

    public SecurityChainBuilder addSessionManagement() throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return this;
    }

    public SecurityChainBuilder addExceptionHandling(JwtAuthenticationEntryPoint entryPoint) throws Exception {
        http.exceptionHandling().authenticationEntryPoint(entryPoint);
        return this;
    }

    public SecurityChainBuilder addJwtFilter(JwtAuthenticationFilter jwtFilter) throws Exception {
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return this;
    }

    public SecurityFilterChain build() throws Exception {
        return http.build();
    }
}
