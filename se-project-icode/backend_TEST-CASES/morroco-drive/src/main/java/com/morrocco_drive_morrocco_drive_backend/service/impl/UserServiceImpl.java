package com.morrocco_drive_morrocco_drive_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;
import com.morrocco_drive_morrocco_drive_backend.repository.UserRepository;
import com.morrocco_drive_morrocco_drive_backend.service.UserService;
import com.morrocco_drive_morrocco_drive_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;  // Fixed typo
    private final JwtTokenHelper tokenHelper;
    private final ModelMapper modelMapper;

    @Override
    public MyUser getRequestedUserProfile(String jwtToken) throws ResourceNotFoundException, UserException {
        String email = tokenHelper.getUsernameFromToken(jwtToken);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("Invalid Jwt Token"));
    }

    @Override
    public MyUser getUserById(Long userId) throws ResourceNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
    }

    @Override
    public List<Ride> getCompletedRides(Long userId) {
        return userRepository.getCompletedRides(userId);
    }

    @Override
    public List<Ride> getUserCurrentRide(Long userId) {
        return userRepository.getCurrentRides(userId);
    }

    @Override
    public List<Ride> getUserRequestedRide(Long userId) throws ResourceNotFoundException {
        return userRepository.getRequestedRides(userId);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }
}
