package com.chen_yonati.notes_keeper.controllers;

import com.chen_yonati.notes_keeper.services.AppService;
import com.chen_yonati.notes_keeper.model.User;
import com.chen_yonati.notes_keeper.exception.CustomValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api")
public class AuthController {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody @Valid User user) {
        User authUser = appService.authenticate(user.getEmail(), user.getPassword());
        if (authUser != null) {
            return ResponseEntity.ok(authUser);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/user/me", method = RequestMethod.GET)
    public ResponseEntity<?> me(@RequestHeader(name = "ID") Integer id) {
        User authUser = appService.findById(id);
        if (authUser != null) {
            return ResponseEntity.ok(authUser);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@Valid @RequestBody User newUser) throws CustomValidationException {
        User user = appService.registerUser(newUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
