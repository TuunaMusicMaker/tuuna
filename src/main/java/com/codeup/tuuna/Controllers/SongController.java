package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Category;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class SongController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    public SongController(UserRepository userDao, SongRepository songDao, CommentRepository commentDao,
                          RatingRepository ratingDao) {
        this.userDao = userDao;
        this.songDao = songDao;
        this.commentDao = commentDao;
        this.ratingDao = ratingDao;
    }

    @GetMapping("/songs")
    public String getSongs(Model model) {

        model.addAttribute("songs", songDao.findAll());
        return "songs/index";
    }

    @GetMapping("/songs/{id}")
    public String getSong(@PathVariable long id, Model model) {

        model.addAttribute("username", songDao.findOne(id).getUser().getUsername());
        model.addAttribute("song", songDao.findOne(id));
        model.addAttribute("id", id);
        model.addAttribute("comments", songDao.findOne(id).getComments());
        model.addAttribute("ratings", songDao.findOne(id).getRatings());
        model.addAttribute("categories", songDao.findOne(id).getCategories());

        return "songs/view";
    }

    @GetMapping("/songs/{id}/edit")
    public String showEditSong(@PathVariable long id, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("song", songDao.findOne(id));
        return "songs/create";
    }

    @GetMapping("/songs/create")
    public String showCreateSong(Model model) {
        model.addAttribute("song", new Song());
        return "songs/create";
    }

    @PostMapping("/posts/create")
    public String createSong(@ModelAttribute Song song, User user, List<Category> categories) {
        song.setUser(user);
        song.setCategories(categories);
        songDao.save(song);
        return "redirect:/songs";
    }

    @PostMapping("/songs/{id}/edit")
    public String editSong(@PathVariable long id, @ModelAttribute Song song) {
        songDao.save(song);
        return "redirect:/songs/" + song.getId();
    }

    @PostMapping("/songs/{id}/delete")
    public String deleteSong(@PathVariable long id, @ModelAttribute Song song) {
        songDao.delete(id);
        return "redirect:/songs";
    }

    @PostMapping("/songs/{id}/rating")
    public String likeSong(@PathVariable long id, @ModelAttribute Song song) {
//        need to finish this method
        return "redirect:/songs";
    }

    @GetMapping("songs/{id}/song.json")
    public @ResponseBody String viewSongStringInJSONFormat(@PathVariable long id) {
        return songDao.findOne(id).getSongHash();
    }

    @GetMapping("/songs/{id}/ajax")
    public String viewSongStringWithAjax(@PathVariable long id) {
        return "songs/ajax";
    }

}
