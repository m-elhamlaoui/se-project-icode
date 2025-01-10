package com.morrocco_drive_morrocco_drive_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morrocco_drive_morrocco_drive_backend.model.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
