package com.chen_yonati.notes_keeper.controllers;

import com.chen_yonati.notes_keeper.services.AppService;
import com.chen_yonati.notes_keeper.model.Note;
import com.chen_yonati.notes_keeper.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("api")
public class NoteController {

    @Autowired
    private AppService appService;

    private User getAuthUser(HttpServletRequest request) {
        User current = (User)request.getAttribute("user");
        return current;
    }

    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public ResponseEntity<Set<Note>> getNotes(HttpServletRequest request) {
        User current = getAuthUser(request);
        try {
            Set<Note> notes = appService.getNotes(current.getId());
            return new ResponseEntity<>(notes, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/notes/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getNote(@PathVariable(name = "id") Integer noteId, HttpServletRequest request) {
        User current = getAuthUser(request);
        Note note = appService.getNote(current.getId(), noteId);

        if (note != null) {

            return new ResponseEntity<>(note, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/notes", method = RequestMethod.POST)
    public ResponseEntity<?> addNote(@RequestBody Note note, HttpServletRequest request) {
        User user = getAuthUser(request);
        note.setUser(user);

        try {
            Note added = appService.addNote(note);
            return new ResponseEntity<>(added, HttpStatus.OK);

        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/notes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteNote(@PathVariable(name = "id") Integer noteId, HttpServletRequest request) {
        User user = getAuthUser(request);
        try {
            appService.deleteNote(user, noteId);
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


