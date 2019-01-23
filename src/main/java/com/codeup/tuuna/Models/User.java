package com.codeup.tuuna.Models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id @GeneratedValue
    private long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 128)
    @JsonIgnore
    private String password;

    @Column(nullable = false, length = 100)
    private String phoneNumber;

    @Column
    @ColumnDefault("false")
    private boolean isAdmin;

    @Column
    @ColumnDefault("false")
    private boolean isBanned;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonBackReference
    private List<Song> songs;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonBackReference
    private List<Comment> comments;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonBackReference
    private List<Rating> ratings;

    public User() { }

    public User(String username, String email, String password, String phoneNumber, boolean isAdmin, boolean isBanned) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
        this.isBanned = isBanned;
    }

    public User(String username, String email, String password, String phoneNumber, boolean isAdmin, boolean isBanned, List<Song> songs, List<Comment> comments, List<Rating> ratings) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.isAdmin = isAdmin;
        this.isBanned = isBanned;
        this.songs = songs;
        this.comments = comments;
        this.ratings = ratings;
    }

    public User(User copy) {
        id = copy.id; // This line is SUPER important! Many things won't work if it's absent
        email = copy.email;
        username = copy.username;
        password = copy.password;
        phoneNumber = copy.phoneNumber;
        isAdmin = copy.isAdmin;
        isBanned = copy.isBanned;
        songs = copy.songs;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAdmin(boolean admin) {
        this.isAdmin = admin;
    }

    public void setBanned(boolean banned) {
        this.isBanned = banned;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public boolean isBanned() {
        return isBanned;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
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
