package com.chen_yonati.notes_keeper.services;

import com.chen_yonati.notes_keeper.repos.NoteRepository;
import com.chen_yonati.notes_keeper.repos.UserRepository;
import com.chen_yonati.notes_keeper.exception.CustomValidationException;
import com.chen_yonati.notes_keeper.model.Note;
import com.chen_yonati.notes_keeper.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppService {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public void init() {
        final int NUM_USER_NOTES = 10;

        List<User> users = new ArrayList<>(10);
        User user = new User();
        user.setName("Chen");
        user.setPassword("1234");
        user.setEmail("c@c.com");
        users.add(user);

        user = new User();
        user.setName("Tal");
        user.setPassword("1234");
        user.setEmail("t@t.com");
        users.add(user);

        for (User user0 : users) {
            Set<Note> notes = new HashSet<>();
            for (int i = 1; i <= NUM_USER_NOTES; i++) {
                float n = (float) (Math.random() * 100);
                Note note = new Note(user0, user0.getName() + " Doing something " + n,
                        "Temperature 90, Cotton, 4kg",
                        1,
                        false,
                        "#CCCCCC",
                        "fa fa-rocket");

                notes.add(note);
            }
            userRepository.save(user0);
            noteRepository.saveAll(notes);
        }
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmailAndPw(email, password);
        if(user == null) return null;
        user.setToken(UUID.randomUUID().toString());
        userRepository.save(user);
        return user;
    }

    public User findById(Integer id) {
        Optional<User> user = userRepository.findById(id);
       return user.orElse(null);
    }

    public User findByToken(String token) {
        User user = userRepository.findByToken(token);
        return user;
    }


    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new IllegalArgumentException("Unable to find user with this email");
        return user;
    }

    public User findUserByEmail2(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    public User registerUser(User newUser) throws CustomValidationException {
        User exist = userRepository.findByEmail(newUser.getEmail());
        if(exist != null) {
            throw new CustomValidationException("email", "Email already exist", "Email already exist");
        }

        newUser.setToken(UUID.randomUUID().toString());
       User created =  userRepository.save(newUser);
       return created;
    }

    public Set<Note> getNotes(int userId) {
        return noteRepository.findNotes(userId);
    }

    public Note getNote(Integer userId, Integer noteId) {
        Note note = noteRepository.findNote(userId, noteId);
        return note;
    }

    public Note addNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(String email, Note note) {
        User user = findUserByEmail(email);
        Optional<Note> modified = noteRepository.findById(note.getId()).map(edit -> {
            edit.setBody(note.getBody());
            edit.setColor(note.getColor());
            edit.setIcon(note.getIcon());
            edit.setPriority(note.getPriority());
            edit.setRead(note.isRead());
            edit.setTitle(note.getTitle());
            return noteRepository.save(edit);
        });

        if (modified.isPresent()) {
            return modified.get();
        } else throw new IllegalArgumentException("Note with id: " + note.getId() + " not found ");
    }

    public void deleteNote(int userId, int noteId) {
            Note note = noteRepository.findNote(userId, noteId);

//        Set<Note> newNotes = user.getNotes().stream().filter(n->!n.getId().equals(noteId)).collect(Collectors.toSet());
//        user.setNotes(newNotes);
//        Note noteToDelete = noteRepository.findById(noteId)
//                .filter(n->n.getId().equals(noteId))
//                .findAny()
//                .orElseThrow(()->new IllegalArgumentException("Unable to find note "+noteId+ " in users "+email+" notes"));
//
//
//        userRepository.save(user);
//        noteRepository.delete(noteToDelete);

        noteRepository.deleteById(noteId);
    }


}
