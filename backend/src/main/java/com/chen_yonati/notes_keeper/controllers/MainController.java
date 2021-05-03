package com.chen_yonati.notes_keeper.controllers;

import com.chen_yonati.notes_keeper.services.AppService;
import com.chen_yonati.notes_keeper.model.Note;
import com.chen_yonati.notes_keeper.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/notes")
public class MainController {

    private Map<UUID, User> tokenToUser = new HashMap<>();

    @Autowired
    private AppService appService;

    @RequestMapping
    @GetMapping()
    public ResponseEntity<Set<Note>> getNotes(@RequestHeader(name = "email") String email) {

        try {
            Set<Note> notes = appService.getNotes(email);
            return new ResponseEntity<>(notes, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping("{id}")
    @GetMapping()
    public ResponseEntity<?> getNote(@RequestHeader(name = "email") String email, @PathVariable(name = "id") Integer noteId) {

        try {
            Note note = appService.getNote(email, noteId);
            return new ResponseEntity<>(note, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping
    public ResponseEntity<?> addNote(@RequestHeader(name = "email") String email,
                                     @RequestBody Note note) {
        try {
            Note added = appService.addNote(email, note);
            return new ResponseEntity<>(added, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteNote(@RequestHeader(name = "email") String email,
                                        @PathVariable(name = "id") Integer noteId) {

        try {
            appService.deleteNote(email, noteId);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping
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


