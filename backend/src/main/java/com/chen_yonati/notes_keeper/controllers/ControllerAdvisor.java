package com.chen_yonati.notes_keeper.controllers;

import com.chen_yonati.notes_keeper.exception.CustomValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ControllerAdvisor  {



    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleSpringValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CustomValidationException.class)
    ResponseEntity<?> handleAppCustomValidation(CustomValidationException ex) {
        return new ResponseEntity<>(ex.getErrorFields(), HttpStatus.BAD_REQUEST);
    }
//
//    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
//    @ResponseStatus(value = HttpStatus.NOT_FOUND)
//    public ErrorResponse resourceNotFoundException(MethodArgumentNotValidException ex, WebRequest request) {
//
//
//        Map<String, String> errors = new HashMap<>();
//        errors.put("email", "Incorrect");
//        return new ErrorResponse(errors);
//    }
}
