package com.morrocco_drive_morrocco_drive_backend.dto;

import com.morrocco_drive_morrocco_drive_backend.model.License;
import com.morrocco_drive_morrocco_drive_backend.model.Vehicle;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DriverSignUpRequest {
  private String name;
  private String email;
  private String password;
  private String mobile;
  private double latitude;
  private double longitude;
  private License license;
  private Vehicle vehicle;
}
