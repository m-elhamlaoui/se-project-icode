package com.morrocco_drive_morrocco_drive_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return ModelMapperFactory.createModelMapper();
    }
}

// Factory Class for ModelMapper
class ModelMapperFactory {
    public static ModelMapper createModelMapper() {
        return new ModelMapper();
    }
}
