package com.chen_yonati.notes_keeper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
//    @Query("select p from Person p where p.age>?1 and p.age<?2")
//    List<Person> findPeopleBetweenAges(int min, int max);
}
