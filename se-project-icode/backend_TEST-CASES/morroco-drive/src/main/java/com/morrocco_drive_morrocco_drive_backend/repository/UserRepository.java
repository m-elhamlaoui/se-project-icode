package com.morrocco_drive_morrocco_drive_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morrocco_drive_morrocco_drive_backend.model.MyUser;
import com.morrocco_drive_morrocco_drive_backend.model.Ride;

public interface UserRepository extends JpaRepository<MyUser, Long> {
    public Optional<MyUser> findByEmail(String email);

    @Query("select r from Ride r where r.status=COMPLETED and r.user.id=:userId")
    public List<Ride> getCompletedRides(
            @Param("userId") Long userId);

    @Query("select r from Ride r where r.status=ACCEPTED or status=STARTED and r.user.id=:userId")
    public List<Ride> getCurrentRides(@Param("userId") Long userId);

    @Query("select r from Ride r where r.status=REQUESTED and r.user.id=:userId")
    public List<Ride> getRequestedRides(@Param("userId") Long userId);
}
