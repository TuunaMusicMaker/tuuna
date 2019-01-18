package com.codeup.tuuna.Models;
import javax.persistence.*;

@Entity
@Table(name="ratings")
public class Rating {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private int ratingNumber;

    @ManyToOne @JoinColumn (name = "song_id")
    private Song song;


    public Rating() { }

    public Rating(int ratingNumber, Song song) {
        this.ratingNumber = ratingNumber;
        this.song = song;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRatingNumber() {
        return ratingNumber;
    }

    public void setRatingNumber(int ratingNumber) {
        this.ratingNumber = ratingNumber;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }
}
