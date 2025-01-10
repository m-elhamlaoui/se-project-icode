package com.morrocco_drive_morrocco_drive_backend.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends Exception {

  public ResourceNotFoundException(String resourceName, String fieldName, String fieldValue) {
    super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
  }

  public ResourceNotFoundException(String resourceName, String fieldName, Long fieldValue) {
    super(String.format("%s not found with %s : %s", resourceName, fieldName, fieldValue));
  }

}
