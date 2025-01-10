package com.morrocco_drive_morrocco_drive_backend.service;

import com.morrocco_drive_morrocco_drive_backend.dto.DriverResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.DriverSignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.JwtResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.LoginRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.SignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;

public interface AuthService {
  UserResponse signUpUser(SignUpRequest request) throws UserException;

  JwtResponse loginUser(LoginRequest request) throws ResourceNotFoundException;

  DriverResponse registerDriver(DriverSignUpRequest request);
}
