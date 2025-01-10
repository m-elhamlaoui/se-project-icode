package com.morrocco_drive_morocco_drive_backend;

public class CalculatorServiceTest {
    
}
package com.morrocco_drive_morocco_drive_backend.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.morrocco_drive_morrocco_drive_backend.service.impl.CalculatorServiceImpl;

@ExtendWith(MockitoExtension.class)
class CalculatorServiceTest {

    @InjectMocks
    private CalculatorServiceImpl calculatorService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void calculateDistance_Success() {
        // Arrange
        double sourceLatitude = 31.6295;  // Marrakech
        double sourceLongitude = -7.9811;
        double destinationLatitude = 33.5731; // Casablanca
        double destinationLongitude = -7.5898;

        // Act
        double distance = calculatorService.calculateDistance(
            sourceLatitude, sourceLongitude, 
            destinationLatitude, destinationLongitude
        );

        // Assert
        assertTrue(distance > 0);
        assertEquals(236.0, distance, 10.0); // Approximately 236 km between Marrakech and Casablanca
    }

    @Test
    void calculateDuration_Success() {
        // Arrange
        LocalDateTime startTime = LocalDateTime.now().minusHours(2);
        LocalDateTime endTime = LocalDateTime.now();

        // Act
        Long duration = calculatorService.calculateDuration(startTime, endTime);

        // Assert
        assertEquals(7200L, duration); // 2 hours = 7200 seconds
    }

    @Test
    void calculateFair_Success() {
        // Arrange
        double distance = 100.0; // 100 km

        // Act
        double fare = calculatorService.calculateFair(distance);

        // Assert
        assertTrue(fare > 0);
        assertEquals(1000.0, fare); // Based on RIDE_FAIR_AMOUNT = 10
    }
}
