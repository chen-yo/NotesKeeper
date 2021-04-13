package com.chen_yonati.notes_keeper;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    public String title;
    @Column(columnDefinition = "TEXT")
    public String body;
    public int priority;
    @Column(name = "isRead")
    public boolean read;
    public String color;
    public String icon;

    public Note(String title, String body, int priority, boolean read, String color, String icon) {
        this.title = title;
        this.body = body;
        this.priority = priority;
        this.read = read;
        this.color = color;
        this.icon = icon;
    }
}