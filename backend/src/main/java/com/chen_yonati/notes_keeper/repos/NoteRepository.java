package com.chen_yonati.notes_keeper.repos;

import com.chen_yonati.notes_keeper.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface NoteRepository extends JpaRepository<Note, Integer> {
    @Query("select n from Note n join n.user u where u.id = :userId")
    Set<Note> findNotes(int userId);

    @Query("select n from Note n join n.user u where u.id = :userId and n.id = :noteId")
    Note findNote(int userId, int noteId);
}
