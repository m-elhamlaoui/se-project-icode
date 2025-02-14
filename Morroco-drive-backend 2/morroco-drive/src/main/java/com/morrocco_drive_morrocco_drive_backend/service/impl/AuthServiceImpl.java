package com.morrocco_drive_morrocco_drive_backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.morrocco_drive_morrocco_drive_backend.dto.DriverResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.DriverSignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.JwtResponse;
import com.morrocco_drive_morrocco_drive_backend.dto.LoginRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.SignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.RefreshToken;
import com.morrocco_drive_morrocco_drive_backend.repository.UserRepository;
import com.morrocco_drive_morrocco_drive_backend.service.AuthService;
import com.morrocco_drive_morrocco_drive_backend.service.CustomUserDetailsService;
import com.morrocco_drive_morrocco_drive_backend.service.DriverService;
import com.morrocco_drive_morrocco_drive_backend.service.RefreshTokenService;
import com.morrocco_drive_morrocco_drive_backend.util.JwtTokenHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserRepository userRepository;
  private final RefreshTokenService refreshTokenService;
  private final JwtTokenHelper jwtTokenHelper;
  private final AuthenticationManager authenticationManager;
  private final CustomUserDetailsService userDetailsService;

  private final DriverService driverService;
  private final PasswordEncoder passwordEncoder;
  private final ModelMapper modelMapper;

  @Override
  public UserResponse signUpUser(SignUpRequest request) throws UserException {

    boolean userPresent = userRepository.findByEmail(request.getEmail()).isPresent();
    if (userPresent)
      throw new UserException("User Already Exists with this email");

    String encodedPassword = passwordEncoder.encode(request.getPassword());

    MyUser createdUser = modelMapper.map(request, MyUser.class);
    createdUser.setPassword(encodedPassword);
    createdUser.setRole(UserRole.NORMAL_USER);

    MyUser savedUser = userRepository.save(createdUser);

    UserResponse userResponse = modelMapper.map(savedUser, UserResponse.class);
    return userResponse;

  }

  @Override
  public JwtResponse loginUser(LoginRequest request) throws ResourceNotFoundException {
    Authentication authentication = authenticate(request.getEmail(), request.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername(), request.getRole());

    String jwtToken = jwtTokenHelper.generateToken(userDetails.getUsername());

    JwtResponse response = JwtResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken.getRefreshToken())
        .type(request.getRole())
        .message("Login successfully : " + userDetails.getUsername())
        .build();
    return response;
  }

  private Authentication authenticate(String username, String password) {
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
        password);
    try {
      Authentication authentication = authenticationManager.authenticate(authenticationToken);
      return authentication;
    } catch (BadCredentialsException e) {
      throw new BadCredentialsException("invalid username or password");
    }
  }

  @Override
  public DriverResponse registerDriver(DriverSignUpRequest request) {
    Driver registeredDriver = driverService.registerDriver(request);
    return modelMapper.map(registeredDriver, DriverResponse.class);
  }

}
