package com.morrocco_drive_morrocco_drive_backend.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morrocco_drive_morrocco_drive_backend.dto.RideDto;
import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;
import com.morrocco_drive_morrocco_drive_backend.service.UserService;

import lombok.RequiredArgsConstructor;

// @Autowired is not valid at the class level, it should be removed.
// Lombok's @RequiredArgsConstructor will handle constructor-based dependency injection.
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> findUserByIdHandler(@PathVariable Long userId) throws ResourceNotFoundException {
        MyUser user = userService.getUserById(userId);
        UserResponse response = modelMapper.map(user, UserResponse.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getRequestedUserProfileHandler(@RequestHeader("Authorization") String jwtToken)
            throws ResourceNotFoundException, UserException {
        MyUser user = userService.getRequestedUserProfile(jwtToken);
        UserResponse response = modelMapper.map(user, UserResponse.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/rides/completed")
    public ResponseEntity<List<RideDto>> rideCompletedHandler(@RequestHeader("Authorization") String jwtToken)
            throws ResourceNotFoundException, UserException {
        MyUser user = userService.getRequestedUserProfile(jwtToken);
        List<Ride> rides = userService.getCompletedRides(user.getId());
        List<RideDto> completedRides = rides.stream()
                .map((ride) -> modelMapper.map(ride, RideDto.class))
                .toList();
        return new ResponseEntity<>(completedRides, HttpStatus.OK);
    }

    @GetMapping("{userId}/rides/current")
    public ResponseEntity<List<RideDto>> getMethodName(@PathVariable Long userId) throws ResourceNotFoundException {
        List<Ride> userCurrentRide = userService.getUserCurrentRide(userId);
        List<RideDto> list = userCurrentRide.stream()
                .map((ride) -> modelMapper.map(ride, RideDto.class))
                .toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("{userId}/rides/requested")
    public ResponseEntity<List<RideDto>> requestRide(@PathVariable Long userId) throws ResourceNotFoundException {
        List<Ride> userCurrentRide = userService.getUserRequestedRide(userId);
        List<RideDto> list = userCurrentRide.stream()
                .map((ride) -> modelMapper.map(ride, RideDto.class))
                .toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
