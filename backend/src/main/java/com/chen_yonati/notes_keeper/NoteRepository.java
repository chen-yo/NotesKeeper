package com.chen_yonati.notes_keeper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface NoteRepository extends JpaRepository<Note, Integer> {
//    @Query("select n from Note n where n.user_id =:userId")
//    List<Note> findUserNotes(int userId);
}
