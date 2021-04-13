package com.chen_yonati.notes_keeper;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String token;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user_notes", referencedColumnName = "id")
    private Set<Note> notes;
}