package com.morrocco_drive_morrocco_drive_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morrocco_drive_morrocco_drive_backend.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
  
}
