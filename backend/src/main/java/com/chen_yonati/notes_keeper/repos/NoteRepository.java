package com.chen_yonati.notes_keeper.repos;

import com.chen_yonati.notes_keeper.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
//    @Query("select n from Note n where n.user_id =:userId")
//    List<Note> findUserNotes(int userId);
}
