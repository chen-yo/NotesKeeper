package com.chen_yonati.notes_keeper;

import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends CrudRepository<Note, Integer> {
}
