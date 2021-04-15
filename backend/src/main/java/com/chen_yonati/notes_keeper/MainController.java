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

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody User user) {
        User authUser = appService.authenticate(user.getEmail(), user.getPassword());
        if (authUser != null) {
            return ResponseEntity.ok(authUser);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping("/notes")
    @GetMapping()
    public ResponseEntity<Set<Note>> getNotes(@RequestHeader(name = "email") String email) {

        try {
            Set<Note> notes = appService.getNotes(email);
            return new ResponseEntity<>(notes, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/notes")
    public ResponseEntity<?> addNote(@RequestHeader(name = "email") String email,
                                     @RequestBody Note note) {
        try {
            Note added = appService.addNote(email, note);
            return new ResponseEntity<>(added, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/notes")
    public ResponseEntity<?> deleteNote(@RequestHeader(name = "email") String email,
                                        @RequestBody Note note) {

        try {
            appService.deleteNote(email, note.getId());
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/notes")
    public ResponseEntity<?> updateNote(@RequestHeader(name = "email") String email,
                                        @RequestBody Note note) {

        Note updated;
        try {
            updated = appService.updateNote(email, note);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(updated, HttpStatus.OK);

    }
}
