package com.kamdz.notility.config;

// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Bean;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.HttpStatus;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.HttpStatusEntryPoint;
// import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import java.util.Arrays;

// @RequiredArgsConstructor
// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig{

//     public static final String[] ENDPOINTS_WHITELIST = {
//             "/css/**",
//             "/",
//             "/main",
//             "/login",
//             "/signup",
//             "/api/**",
//             "/ws/**",
//     };

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource(){
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:4200"));
//         configuration.setAllowedMethods(Arrays.asList(
//                 HttpMethod.GET.name(),
//                 HttpMethod.PUT.name(),
//                 HttpMethod.DELETE.name(),
//                 HttpMethod.POST.name(),
//                 HttpMethod.OPTIONS.name()
//         ));
//         configuration.setAllowedHeaders(Arrays.asList(
//                 HttpHeaders.AUTHORIZATION,
//                 HttpHeaders.CONTENT_TYPE
//         ));
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**",configuration);
//         return source;
//     }

//     private final UserAuthenticationProvider userAuthenticationProvider;

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(c -> c.configurationSource(corsConfigurationSource()))
//             .exceptionHandling(customizer -> customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
//             .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
//             .csrf(AbstractHttpConfigurer::disable)
//             .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeRequests((requests) -> requests
//                 .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
//                 .anyRequest().authenticated());
//         return http.build();
//     }
    

// }

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    public static final String[] ENDPOINTS_WHITELIST = {
            "/css/**",
            "/",
            "/main",
            "/login",
            "/signup",
            "/api/**",
            "/ws/**",
    };

    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .exceptionHandling(customizer -> customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeRequests((requests) -> requests
                .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
                .anyRequest().authenticated());

        return http.build();
    }
}
