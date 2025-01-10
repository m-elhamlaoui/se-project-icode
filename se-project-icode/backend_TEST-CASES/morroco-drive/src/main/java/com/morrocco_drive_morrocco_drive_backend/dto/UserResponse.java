package com.morrocco_drive_morrocco_drive_backend.dto;

import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private Long id;
  private String email;
  private String fullName;
  private String mobile;
  private UserRole role;
}
