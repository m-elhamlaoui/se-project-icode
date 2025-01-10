package com.morrocco_drive_morrocco_drive_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morrocco_drive_morrocco_drive_backend.dto.MessageResponse;

@RestController
public class HomeController {
  @GetMapping("/home")
  public ResponseEntity<MessageResponse> homeHandler() {
    return new ResponseEntity<>(new MessageResponse("Welcome to Ride Fast Backend System"), HttpStatus.OK);
  }
}
