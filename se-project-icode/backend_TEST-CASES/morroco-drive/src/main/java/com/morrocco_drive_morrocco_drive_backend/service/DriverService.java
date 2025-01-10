package com.morrocco_drive_morrocco_drive_backend.service;

import java.util.List;

import com.morrocco_drive_morrocco_drive_backend.dto.DriverResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.DriverSignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.RideDto;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;

public interface DriverService {
    Driver registerDriver(DriverSignUpRequest driverSignUpRequest);

    List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, Ride ride);

    Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude);

    Driver getRequestedDriverProfile(String jwtToken) throws ResourceNotFoundException;

    List<Ride> getDriverCurrentRide(Long driverId) throws ResourceNotFoundException;

    List<Ride> getDriverStartedRide(String jwtToken) throws ResourceNotFoundException;

    List<Ride> getAllocatedRides(Long driverId);

    List<Driver> getAvailableDrivers();

    List<Ride> getCompletedRides(Long driverId);

    List<RideDto> getAllRides();

    double calculateTotalRevenue();

    List<DriverResponse> getAllDrivers();
}
