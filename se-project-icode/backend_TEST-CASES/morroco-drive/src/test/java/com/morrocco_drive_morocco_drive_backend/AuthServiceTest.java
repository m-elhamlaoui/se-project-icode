package com.morrocco_drive_morocco_drive_backend.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.morrocco_drive_morrocco_drive_backend.dto.LoginRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.SignUpRequest;
import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.repository.UserRepository;
import com.morrocco_drive_morrocco_drive_backend.service.impl.AuthServiceImpl;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthServiceImpl authService;

    private SignUpRequest signUpRequest;
    private LoginRequest loginRequest;
    private MyUser user;

    @BeforeEach
    void setUp() {
        signUpRequest = new SignUpRequest();
        signUpRequest.setEmail("test@test.com");
        signUpRequest.setPassword("password");
        signUpRequest.setFullName("Test User");
        signUpRequest.setMobile("1234567890");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@test.com");
        loginRequest.setPassword("password");
        loginRequest.setRole(UserRole.NORMAL_USER);

        user = new MyUser();
        user.setId(1L);
        user.setEmail("test@test.com");
        user.setPassword("encodedPassword");
        user.setFullName("Test User");
    }

    @Test
    void signUpUser_Success() throws UserException {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);
        when(modelMapper.map(any(), any())).thenReturn(new UserResponse());

        // Act
        UserResponse response = authService.signUpUser(signUpRequest);

        // Assert
        assertNotNull(response);
        verify(userRepository).save(any());
        verify(passwordEncoder).encode(anyString());
    }

    @Test
    void signUpUser_UserExists() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        // Act & Assert
        assertThrows(UserException.class, () -> authService.signUpUser(signUpRequest));
    }

    @Test
    void loginUser_Success() {
        // Arrange
        when(authenticationManager.authenticate(any()))
            .thenReturn(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // Act & Assert
        assertDoesNotThrow(() -> authService.loginUser(loginRequest));
    }
}