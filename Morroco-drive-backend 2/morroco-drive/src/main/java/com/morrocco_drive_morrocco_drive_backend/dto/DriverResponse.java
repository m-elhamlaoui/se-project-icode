package com.morrocco_drive_morrocco_drive_backend.dto;

import com.morrocco_drive_morrocco_drive_backend.enums.UserRole;
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
public class DriverResponse {
  private Long id;
  private String name;
  private String email;
  private String mobile;
  private double rating;
  private double latitude;
  private double longitude;
  private License license;
  private UserRole role;
  private Vehicle vehicle;
  private Long totalRevenue;
}