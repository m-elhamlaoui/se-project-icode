package com.morrocco_drive_morrocco_drive_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morrocco_drive_morrocco_drive_backend.enums.RideStatus;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;

public interface DriverRepository extends JpaRepository<Driver, Long> {
  public Optional<Driver> findByEmail(String email);
  @Query("select r from Ride r where r.status=STARTED and r.driver.id=:driverId")
  public List<Ride> getDriverStartedRides(@Param("driverId") Long driverId);

  @Query("select r from Ride r where r.status=REQUESTED and r.driver.id=:driverId")
  public List<Ride> getAllocatedRides(@Param("driverId") Long driverId);

  @Query("select r from Ride r where r.status=ACCEPTED and r.driver.id=:driverId")
  public List<Ride> getCurrentRides(@Param("driverId") Long driverId);

  @Query("select r from Ride r where r.status=STARTED and r.driver.id=:driverId")
  public List<Ride> getstartedRides(@Param("driverId") Long driverId);

  @Query("select r from Ride r where r.status=COMPLETED and r.driver.id=:driverId")
  public List<Ride> getCompletedRides(@Param("driverId") Long driverId);

@Query("SELECT r FROM Ride r WHERE r.driver.id = :driverId AND r.status = :status")
List<Ride> findRidesByDriverAndStatus(@Param("driverId") Long driverId, @Param("status") RideStatus status);

  @Query("SELECT r FROM Ride r WHERE r.driver.id = :driverId AND r.status = :status")
  List<Ride> getStartedRides(@Param("driverId") Long driverId, @Param("status") RideStatus status);
  
}
