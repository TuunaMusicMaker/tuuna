package com.codeup.tuuna.Models;
import javax.persistence.*;

@Entity
@Table(name="ratings", uniqueConstraints={
        @UniqueConstraint(columnNames={"song_id", "user_id"})
})
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne @JoinColumn (name = "song_id")
    private Song song;

    @ManyToOne @JoinColumn (name = "user_id")
    private User user;


    public Rating() { }

    public Rating(Song song, User user) {
        this.song = song;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
