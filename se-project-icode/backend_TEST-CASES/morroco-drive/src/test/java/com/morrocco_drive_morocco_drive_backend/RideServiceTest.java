
package com.morrocco_drive_morocco_drive_backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyLong;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.morrocco_drive_morrocco_drive_backend.dto.RideRequest;
import com.morrocco_drive_morrocco_drive_backend.enums.RideStatus;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;
import com.morrocco_drive_morrocco_drive_backend.repository.DriverRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.RideRepository;
import com.morrocco_drive_morrocco_drive_backend.service.CalculatorService;
import com.morrocco_drive_morrocco_drive_backend.service.DriverService;
import com.morrocco_drive_morrocco_drive_backend.service.impl.RideServiceImpl;

@ExtendWith(MockitoExtension.class)
class RideServiceTest {

    @Mock
    private DriverService driverService;
    
    @Mock
    private RideRepository rideRepository;
    
    @Mock
    private CalculatorService calculatorService;
    
    @Mock
    private DriverRepository driverRepository;

    @InjectMocks
    private RideServiceImpl rideService;

    private RideRequest rideRequest;
    private MyUser user;
    private Driver driver;
    private Ride ride;

    @BeforeEach
    void setUp() {
        rideRequest = new RideRequest();
        rideRequest.setPickupLatitude(12.12);
        rideRequest.setPickupLongitude(13.13);
        rideRequest.setDestinationLatitude(14.14);
        rideRequest.setDestinationLongitude(15.15);
        rideRequest.setPickupArea("Area 1");
        rideRequest.setDestinationArea("Area 2");

        user = new MyUser();
        user.setId(1L);
        user.setEmail("test@test.com");

        driver = new Driver();
        driver.setId(1L);
        driver.setEmail("driver@test.com");

        ride = new Ride();
        ride.setId(1L);
        ride.setUser(user);
        ride.setDriver(driver);
        ride.setStatus(RideStatus.REQUESTED);
        ride.setOtp(1234);
    }

    @Test
    void requestRide_Success() throws UserException {
        // Arrange
        ArrayList<Driver> drivers = new ArrayList<>();
        drivers.add(driver);
        when(driverService.getAvailableDrivers(anyDouble(), anyDouble(), any())).thenReturn(drivers);
        when(driverService.getNearestDriver(any(), anyDouble(), anyDouble())).thenReturn(driver);
        when(rideRepository.save(any())).thenReturn(ride);

        // Act
        Ride result = rideService.requestRide(rideRequest, user);

        // Assert
        assertNotNull(result);
        assertEquals(RideStatus.REQUESTED, result.getStatus());
        verify(rideRepository).save(any());
    }

    @Test
    void requestRide_NoDriverAvailable() {
        // Arrange
        when(driverService.getAvailableDrivers(anyDouble(), anyDouble(), any())).thenReturn(new ArrayList<>());
        when(driverService.getNearestDriver(any(), anyDouble(), anyDouble())).thenReturn(null);

        // Act & Assert
        assertThrows(UserException.class, () -> rideService.requestRide(rideRequest, user));
    }

    @Test
    void acceptRide_Success() throws ResourceNotFoundException {
        // Arrange
        when(rideRepository.findById(anyLong())).thenReturn(Optional.of(ride));
        when(rideRepository.save(any())).thenReturn(ride);
        when(driverRepository.save(any())).thenReturn(driver);

        // Act
        Ride result = rideService.acceptRide(1L);

        // Assert
        assertNotNull(result);
        assertEquals(RideStatus.ACCEPTED, result.getStatus());
        assertNotNull(result.getOtp());
        verify(rideRepository).save(any());
        verify(driverRepository).save(any());
    }

    @Test
    void startRide_Success() throws ResourceNotFoundException, UserException {
        // Arrange
        ride.setOtp(1234);
        when(rideRepository.findById(anyLong())).thenReturn(Optional.of(ride));
        when(rideRepository.save(any())).thenReturn(ride);

        // Act
        Ride result = rideService.startRide(1L, 1234);

        // Assert
        assertNotNull(result);
        assertEquals(RideStatus.STARTED, result.getStatus());
        assertNotNull(result.getStartTime());
    }

    @Test
    void startRide_InvalidOTP() {
        // Arrange
        ride.setOtp(1234);
        when(rideRepository.findById(anyLong())).thenReturn(Optional.of(ride));

        // Act & Assert
        assertThrows(UserException.class, () -> rideService.startRide(1L, 5678));
    }

    @Test
    void completeRide_Success() throws ResourceNotFoundException {
        // Arrange
        ride.setStartTime(LocalDateTime.now().minusHours(1));
        when(rideRepository.findById(anyLong())).thenReturn(Optional.of(ride));
        when(calculatorService.calculateDistance(anyDouble(), anyDouble(), anyDouble(), anyDouble())).thenReturn(10.0);
        when(calculatorService.calculateFair(anyDouble())).thenReturn(100.0);
        when(rideRepository.save(any())).thenReturn(ride);
        when(driverRepository.save(any())).thenReturn(driver);

        // Act
        Ride result = rideService.completeRide(1L);

        // Assert
        assertNotNull(result);
        assertEquals(RideStatus.COMPLETED, result.getStatus());
        assertNotNull(result.getEndTime());
        assertNotNull(result.getFare());
        verify(rideRepository).save(any());
        verify(driverRepository).save(any());
    }
}
