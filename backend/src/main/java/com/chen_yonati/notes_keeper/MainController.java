package com.chen_yonati.notes_keeper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class MainController {

    private Map<UUID, User> tokenToUser = new HashMap<>();

    @Autowired
    private AppService appService;

    @RequestMapping("/login")
    @PostMapping()
    public ResponseEntity<User> login(String email, String password) {
        try {
            User user = appService.findUserByEmail(email);
            if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            if (!user.getPassword().equalsIgnoreCase(password)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            UUID token = UUID.randomUUID();
            user.setToken(token.toString());
            tokenToUser.put(token, user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping("/list")
    @GetMapping()
    public ResponseEntity<Set<Note>> getNotes(@RequestParam(name = "email") String email) {

        try {
            Set<Note> notes = appService.getNotes(email);
            return new ResponseEntity<>(notes, HttpStatus.OK);

        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


//    @RequestMapping("/me")
//    @PostMapping()
//    public ResponseEntity<User> me(String token) {
//        try {
//            User user = tokenToUser.get(UUID.fromString(token));
//            User user = appService.findUserByEmail(user.);
//            if (!user.getPassword().equalsIgnoreCase(password)) {
//                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//            }
//            UUID token = UUID.randomUUID();
//            user.setToken(token.toString());
//            tokenToUser.put(token, user);
//            return new ResponseEntity<>(user, HttpStatus.OK);
//        } catch (NoSuchElementException ex) {
//            return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
//        }
//    }
}
