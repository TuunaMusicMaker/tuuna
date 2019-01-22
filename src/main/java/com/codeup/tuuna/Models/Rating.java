package com.codeup.tuuna.Models;
import javax.persistence.*;

@Entity
@Table(name="ratings", uniqueConstraints={
        @UniqueConstraint(columnNames={"song_id", "user_id"})
})
public class Rating {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private byte ratingNumber;

    @ManyToOne @JoinColumn (name = "song_id")
    private Song song;

    @ManyToOne @JoinColumn (name = "user_id")
    private User user;


    public Rating() { }

    public Rating(byte ratingNumber, Song song, User user) {
        this.ratingNumber = ratingNumber;
        this.song = song;
        this.user = user;
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

    public void setRatingNumber(byte ratingNumber) {
        this.ratingNumber = ratingNumber;
    }

    public Song getSong() {
        return song;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
