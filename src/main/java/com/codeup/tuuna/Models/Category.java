package com.codeup.tuuna.Models;
import javax.persistence.*;

@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, length = 120)
    private String title;

    @ManyToOne @JoinColumn (name = "song_id")
    private Song song;

    public Category() { }

    public Category(String title, Song song) {
        this.title = title;
        this.song = song;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }


}
