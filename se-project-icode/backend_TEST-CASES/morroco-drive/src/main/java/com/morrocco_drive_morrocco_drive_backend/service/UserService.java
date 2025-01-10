package com.morrocco_drive_morrocco_drive_backend.service;

import java.util.List;

import com.morrocco_drive_morrocco_drive_backend.dto.UserResponse;
import com.morrocco_drive_morrocco_drive_backend.exception.ResourceNotFoundException;
import com.morrocco_drive_morrocco_drive_backend.exception.UserException;
import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;

public interface UserService {

    /**
     * Get the profile of the requested user using a JWT token.
     *
     * @param jwtToken The JWT token for authentication.
     * @return The requested user's profile.
     * @throws ResourceNotFoundException If the user is not found.
     * @throws UserException If the JWT token is invalid.
     */
    MyUser getRequestedUserProfile(String jwtToken) throws ResourceNotFoundException, UserException;

    /**
     * Get a user by their ID.
     *
     * @param userId The ID of the user.
     * @return The user's profile.
     * @throws ResourceNotFoundException If the user is not found.
     */
    MyUser getUserById(Long userId) throws ResourceNotFoundException;

    /**
     * Get all completed rides of a user.
     *
     * @param userId The ID of the user.
     * @return A list of completed rides.
     */
    List<Ride> getCompletedRides(Long userId);

    /**
     * Get the current ride of a user.
     *
     * @param userId The ID of the user.
     * @return A list of current rides.
     * @throws ResourceNotFoundException If no current rides are found for the user.
     */
    List<Ride> getUserCurrentRide(Long userId) throws ResourceNotFoundException;

    /**
     * Get all requested rides of a user.
     *
     * @param userId The ID of the user.
     * @return A list of requested rides.
     * @throws ResourceNotFoundException If no requested rides are found for the user.
     */
    List<Ride> getUserRequestedRide(Long userId) throws ResourceNotFoundException;

    /**
     * Get all users as a list of user responses.
     *
     * @return A list of user responses.
     */
    List<UserResponse> getAllUsers();
}
