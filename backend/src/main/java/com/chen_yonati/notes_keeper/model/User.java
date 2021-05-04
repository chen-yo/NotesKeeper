package com.chen_yonati.notes_keeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    @Column(unique = true, nullable = false)
    @NotBlank(message = "Email field required")
    @Email(message = "Not a valid email")
    private String email;

    @Min(value = 4, message = "Password must be at least 4 chars")
    @NotBlank(message = "Password field required")
//    @Max(value = 10, message = "Password should be less than 10")
    private String password;

    @Column(unique = true)
    private String token;
}