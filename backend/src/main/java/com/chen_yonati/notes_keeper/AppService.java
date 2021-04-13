package com.chen_yonati.notes_keeper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AppService {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public void init() {
        final int NUM_USER_NOTES = 10;
        User user = new User();
        user.setName("Chen");
        user.setPassword("1234");
        Set<Note> notes = new HashSet<>();

        for (int i = 1; i <= NUM_USER_NOTES; i++) {
            float n = (float) (Math.random() * 100);
            Note note = new Note("Doing something " + n,
                    "Temperature 90, Cotton, 4kg",
                    1,
                    false,
                    "red",
                    "fa-a");

            notes.add(note);
        }

        user.setNotes(notes);
        userRepository.save(user);
    }

    public boolean authenticate(String email, String password) {
        User user = new User();
        user.setName(email);
        user.setPassword(password);
        return true;
    }


}
