package com.morrocco_drive_morrocco_drive_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morrocco_drive_morrocco_drive_backend.dto.DriverResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.RideDto;
import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.enums.RideStatus;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;
import com.morrocco_drive_morrocco_drive_backend.repository.DriverRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.RideRepository;
import com.morrocco_drive_morrocco_drive_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
public class CompanyController {
  private final UserRepository userRepository;
  private final RideRepository rideRepository;
  private final DriverRepository driverRepository;
  private final ModelMapper modelMapper;

  @GetMapping("/totalRevenue")
  public ResponseEntity<?> getTotalRevenue(@RequestHeader("Authorization") String jwt) {
    List<Ride> allRides = rideRepository.findAll();

    double sum = allRides.stream()
        .filter((ride) -> ride.getStatus().equals(RideStatus.COMPLETED))
        .mapToDouble((ride -> ride.getFare() * 0.2)).sum();
    HashMap<String, Double> map = new HashMap<>();
    map.put("totalRevenue", sum);
    return new ResponseEntity<>(map, HttpStatus.OK);
  }

  @GetMapping("/allRides")
  public ResponseEntity<List<RideDto>> getAllRides(@RequestHeader("Authorization") String jwt) {
    List<Ride> allRides = rideRepository.findAll();
    List<RideDto> list = allRides.stream()
        .filter(ride -> ride.getStatus().equals(RideStatus.COMPLETED))
        .map((ride -> modelMapper.map(ride, RideDto.class))).toList();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/allUsers")
  public ResponseEntity<List<UserResponse>> getAllUsers(@RequestHeader("Authorization") String jwt) {
    List<MyUser> allUsers = userRepository.findAll();
    List<UserResponse> list = allUsers.stream().map((user -> modelMapper.map(user, UserResponse.class))).toList();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/allDrivers")
  public ResponseEntity<List<DriverResponse>> getAllDrivers(@RequestHeader("Authorization") String jwt) {
    List<Driver> allDrivers = driverRepository.findAll();
    List<DriverResponse> list = allDrivers.stream().map((driver -> modelMapper.map(
        driver, DriverResponse.class))).toList();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

}
