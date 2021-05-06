package com.chen_yonati.notes_keeper.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
@NoArgsConstructor
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "cannot be empty")
    public String title;

    @Column(columnDefinition = "TEXT")
    public String body;

    public int priority;
    @Column(name = "isRead")
    public boolean read;

    public String color;
    public String icon;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    public User user;

    public Note(User user, String title, String body, int priority, boolean read, String color, String icon) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.priority = priority;
        this.read = read;
        this.color = color;
        this.icon = icon;
    }
}