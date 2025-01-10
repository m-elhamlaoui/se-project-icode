package com.morrocco_drive_morrocco_drive_backend.dto;

import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
  private String accessToken;
  private String refreshToken;
  private String message;
  private UserRole type;
}
