package com.usta.gallery;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Permite credenciales (cookies, etc.)
        config.setAllowCredentials(true);
        
        // Origen permitido (tu frontend)
        config.addAllowedOrigin("http://4.233.147.167:2017");
        
        // Permite todos los encabezados
        config.addAllowedHeader("*");
        
        // Permite todos los métodos HTTP
        config.addAllowedMethod("*");

        // Aplica la configuración a todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}