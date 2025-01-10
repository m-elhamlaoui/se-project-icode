package com.morrocco_drive_morrocco_drive_backend.service;

import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.model.RefreshToken;

public interface RefreshTokenService {
  RefreshToken createRefreshToken(String username, UserRole userRole) throws ResourceNotFoundException;

  boolean verifyRefreshToken(RefreshToken refreshToken);

  String createJwtTokenFromRefreshToken(RefreshToken refreshToken, UserRole userRole) throws ResourceNotFoundException;
}
