package com.morrocco_drive_morrocco_drive_backend.service;

import com.morrocco_drive_morrocco_drive_backend.dto.RideRequest;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.Driver;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;

public interface RideService {
  Ride requestRide(RideRequest rideRequest, MyUser user) throws UserException;

  Ride createRide(MyUser user, Driver nearestDriver, double pickupLatitude, double pickupLongitude,
      double destinationLatitude, double destinationLongitude, String pickupArea, String destinationArea);

  Ride acceptRide(Long rideId) throws ResourceNotFoundException;

  Ride declineRide(Long rideId, Long driverId) throws ResourceNotFoundException;

  Ride startRide(Long rideId, int OTP) throws ResourceNotFoundException, UserException;

  Ride completeRide(Long rideId) throws ResourceNotFoundException;

  Ride cancelRide(Long rideId) throws ResourceNotFoundException;

  Ride findRideById(Long rideId) throws ResourceNotFoundException;

}
