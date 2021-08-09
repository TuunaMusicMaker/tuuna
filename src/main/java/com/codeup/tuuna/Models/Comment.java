package com.codeup.tuuna.Models;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name="comments")
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String body;

    @Column
    @ColumnDefault("false")
    private boolean isFlagged;

    @ManyToOne @JoinColumn (name = "user_id")
    private User user;

    @ManyToOne @JoinColumn (name = "song_id")
    private Song song;

    public Comment() { }

    public Comment(String body, boolean isFlagged, User user, Song song) {
        this.body = body;
        this.isFlagged = isFlagged;
        this.user = user;
        this.song = song;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public boolean isFlagged() {
        return isFlagged;
    }

    public void setFlagged(boolean flagged) {
        isFlagged = flagged;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

}
