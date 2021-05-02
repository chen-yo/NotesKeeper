package com.chen_yonati.notes_keeper;

import com.chen_yonati.notes_keeper.exception.MyValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RequestMapping;

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
        return user;
    }

    public User findById(Integer id) {
        Optional<User> user = userRepository.findById(id);
       return user.orElse(null);
    }


    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new IllegalArgumentException("Unable to find user with this email");
        return user;
    }

    public User registerUser(User newUser) throws MyValidationException {
        User exist = userRepository.findByEmail(newUser.getEmail());
        if(exist != null) {
            Map<String, String> errors = new HashMap<>();
            errors.put("email", "Email already exist");
            throw new MyValidationException(errors);
        }
       User created =  userRepository.save(newUser);
       return created;
    }

    public Set<Note> getNotes(String email) {
        User u = userRepository.findByEmail(email);
        if (u == null) throw new IllegalArgumentException("Email does not exist");
        Set<Note> userNotes = noteRepository.findAll().stream().filter(note -> note.getUser().getId().equals(u.getId())).collect(Collectors.toSet());
        return new HashSet<>(userNotes);
    }
    public Note getNote(String email, Integer noteId) {
        User u = userRepository.findByEmail(email);
        if (u == null) throw new IllegalArgumentException("Email does not exist");
        Optional<Note> note = noteRepository.findById(noteId);
        if(note.isPresent()) {
            return note.get();
        }

        throw new IllegalArgumentException("Unable to find note with id "+noteId);
    }

    public Note addNote(String email, Note note) {
        User user = findUserByEmail(email);
        note.setUser(user);
        Note added = noteRepository.save(note);
        return added;
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

    public void deleteNote(String email, int noteId) {
        User user = findUserByEmail(email);

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
