package com.morrocco_drive_morrocco_drive_backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.morrocco_drive_morrocco_drive_backend.dto.DriverResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.DriverSignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.RideDto;
import com.morrocco_drive_morrocco_drive_backend.enums.RideStatus;
import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.License;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;
import com.morrocco_drive_morrocco_drive_backend.model.Vehicle;
import com.morrocco_drive_morrocco_drive_backend.repository.DriverRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.LicenseRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.RideRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.VehicleRepository;
import com.morrocco_drive_morrocco_drive_backend.service.CalculatorService;
import com.morrocco_drive_morrocco_drive_backend.service.DriverService;
import com.morrocco_drive_morrocco_drive_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final LicenseRepository licenseRepository;
    private final VehicleRepository vehicleRepository;
    private final CalculatorService calculatorService;
    private final JwtTokenHelper tokenHelper;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final RideRepository rideRepository; // Fixed initialization

    @Override
    public Driver registerDriver(DriverSignUpRequest request) {
        License license = request.getLicense();
        Vehicle vehicle = request.getVehicle();

        License savedLicense = licenseRepository.save(license);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        Driver driver = modelMapper.map(request, Driver.class);
        driver.setPassword(passwordEncoder.encode(request.getPassword()));
        driver.setLicense(savedLicense);
        driver.setVehicle(savedVehicle);
        driver.setRole(UserRole.DRIVER);
        Driver savedDriver = driverRepository.save(driver);

        savedLicense.setDriver(savedDriver);
        savedVehicle.setDriver(savedDriver);

        licenseRepository.save(savedLicense);
        vehicleRepository.save(savedVehicle);

        return savedDriver;
    }

    @Override
    public List<Driver> getAvailableDrivers() {
        return driverRepository.findAll()
                .stream()
                .filter(driver -> driver.getCurrentRide() == null)
                .collect(Collectors.toList());
    }

    @Override
    public List<Driver> getAvailableDrivers(double pickupLatitude, double pickupLongitude, Ride ride) {
        return driverRepository.findAll()
                .stream()
                .filter(driver -> driver.getCurrentRide() == null || driver.getCurrentRide().getStatus() == RideStatus.COMPLETED)
                .filter(driver -> ride.getDeclinedDrivers() == null || !ride.getDeclinedDrivers().contains(driver.getId()))
                .collect(Collectors.toList());
    }

    @Override
    public Driver getNearestDriver(List<Driver> availableDrivers, double pickupLatitude, double pickupLongitude) {
        return availableDrivers.stream()
                .min((d1, d2) -> Double.compare(
                        calculatorService.calculateDistance(d1.getLatitude(), d1.getLongitude(), pickupLatitude, pickupLongitude),
                        calculatorService.calculateDistance(d2.getLatitude(), d2.getLongitude(), pickupLatitude, pickupLongitude)))
                .orElse(null);
    }

    @Override
    public Driver getRequestedDriverProfile(String jwtToken) throws ResourceNotFoundException {
        String email = tokenHelper.getUsernameFromToken(jwtToken);
        return driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "username", email));
    }

    @Override
    public List<Ride> getDriverCurrentRide(Long driverId) throws ResourceNotFoundException {
        return driverRepository.getCurrentRides(driverId);
    }

    @Override
    public List<Ride> getAllocatedRides(Long driverId) {
        return driverRepository.getAllocatedRides(driverId);
    }

    @Override
    public List<RideDto> getAllRides() {
        return rideRepository.findAll()
                .stream()
                .map(ride -> modelMapper.map(ride, RideDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public double calculateTotalRevenue() {
        return rideRepository.findAll()
                .stream()
                .filter(ride -> ride.getStatus() == RideStatus.COMPLETED)
                .mapToDouble(ride -> ride.getFare() * 0.2)
                .sum();
    }

    @Override
    public List<DriverResponse> getAllDrivers() {
        return driverRepository.findAll()
                .stream()
                .map(driver -> modelMapper.map(driver, DriverResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Ride> getCompletedRides(Long driverId) {
        return driverRepository.getCompletedRides(driverId);
    }

    @Override
    public List<Ride> getDriverStartedRide(String jwtToken) throws ResourceNotFoundException {
        String email = tokenHelper.getUsernameFromToken(jwtToken);
        Driver driver = driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "username", email));
        return driverRepository.getDriverStartedRides(driver.getId());
    }


}
