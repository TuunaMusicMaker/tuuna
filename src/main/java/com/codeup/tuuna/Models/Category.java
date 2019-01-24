package com.codeup.tuuna.Models;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, length = 120)
    private String category;

    @ManyToMany(mappedBy = "categories")
    private List<Song> songs;

    public Category() { }

    public Category(String category) { this.category = category; }

    public Category(String category, List<Song> songs) {
        this.category = category;
        this.songs = songs;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }


}
