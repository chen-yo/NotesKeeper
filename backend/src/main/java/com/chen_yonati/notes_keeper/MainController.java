package com.chen_yonati.notes_keeper;

import com.chen_yonati.notes_keeper.exception.MyValidationException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Method;
import java.util.*;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> register(@Valid @RequestBody User newUser) throws MyValidationException {
        User user = appService.registerUser(newUser);
        if (user != null) {
            return ResponseEntity.ok(user);
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

    @RequestMapping("/notes/{id}")
    @GetMapping()
    public ResponseEntity<?> getNote(@RequestHeader(name = "email") String email, @PathVariable(name = "id") Integer noteId) {

        try {
            Note note = appService.getNote(email, noteId);
            return new ResponseEntity<>(note, HttpStatus.OK);

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

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@RequestHeader(name = "email") String email,
                                        @PathVariable(name = "id") Integer noteId) {

        try {
            appService.deleteNote(email, noteId);
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

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, MyValidationException.class})
    ErrorResponse handleValidationExceptions(
            Exception ex) {
        Map<String, String> errors = new HashMap<>();
        if(ex instanceof MethodArgumentNotValidException) {
            MethodArgumentNotValidException ex0 = (MethodArgumentNotValidException)ex;
            ex0.getBindingResult().getAllErrors().forEach((error) -> {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                errors.put(fieldName, errorMessage);
            });
        } else {
            MyValidationException ex0 = (MyValidationException)ex;
            errors.putAll(ex0.getErrorFields());
        }

        return new ErrorResponse(errors);
    }
}


