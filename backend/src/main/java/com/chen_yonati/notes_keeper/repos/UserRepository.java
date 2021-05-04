package com.chen_yonati.notes_keeper.repos;

import com.chen_yonati.notes_keeper.model.Note;
import com.chen_yonati.notes_keeper.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    User findByEmailAndPw(String email, String password);

    @Query("SELECT u FROM User u WHERE u.token = :token")
    User findByToken(String token);
}
