package com.codeup.tuuna.Models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="songs")
public class Song {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false)
    private String description;

    @JsonManagedReference
    @Column(nullable = false, length = 1200)
    private String songHash;

    @Column
    @ColumnDefault("false")
    private boolean isFlagged;

    @ManyToOne @JoinColumn (name = "user_id")
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="songs_categories",
            joinColumns={@JoinColumn(name="song_id")},
            inverseJoinColumns={@JoinColumn(name="category_id")}
    )
    private List<Category> categories;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "song")
    @JsonBackReference
    private List<Comment> comments;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "song")
    @JsonBackReference
    private List<Rating> ratings;

    public Song() { }

    public Song(String title, String description, String songHash) {
        this.title = title;
        this.description = description;
        this.songHash = songHash;
    }

    public Song(String title, String description, String songHash, boolean isFlagged, User user,
                List<Category> categories) {
        this.title = title;
        this.description = description;
        this.songHash = songHash;
        this.isFlagged = isFlagged;
        this.user = user;
        this.categories = categories;
    }

    public Song(String title, String description, String songHash, boolean isFlagged, User user, List<Category> categories, List<Comment> comments, List<Rating> ratings) {
        this.title = title;
        this.description = description;
        this.songHash = songHash;
        this.isFlagged = isFlagged;
        this.user = user;
        this.categories = categories;
        this.comments = comments;
        this.ratings = ratings;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSongHash(String songHash) {
        this.songHash = songHash;
    }

    public void setFlagged(boolean flagged) {
        isFlagged = flagged;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getSongHash() {
        return songHash;
    }

    public boolean isFlagged() {
        return isFlagged;
    }

    public User getUser() {
        return user;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

}
