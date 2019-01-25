package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.*;
import com.codeup.tuuna.Repositories.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@Controller
public class SongController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    private final CategoriesRepository categoryDao;

    public SongController(UserRepository userDao, SongRepository songDao, CommentRepository commentDao,
                          RatingRepository ratingDao, CategoriesRepository categoryDao) {
        this.userDao = userDao;
        this.songDao = songDao;
        this.commentDao = commentDao;
        this.ratingDao = ratingDao;
        this.categoryDao = categoryDao;
    }

    @GetMapping("/songs")
    public String getSongs(Model model) {

        model.addAttribute("songs", songDao.findAll());
        return "songs/index";
    }

    @GetMapping("/songs/{id}")
    public String getSong(@PathVariable long id, Model model) {

//        String user = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String owner = songDao.findOne(id).getUser().getUsername();
//        boolean isOwner = (user.equals(owner));
//
//
//        model.addAttribute("isOwner", isOwner);
        model.addAttribute("username", songDao.findOne(id).getUser().getUsername());
        model.addAttribute("song", songDao.findOne(id));
        model.addAttribute("id", id);
        model.addAttribute("comments", songDao.findOne(id).getComments());
        model.addAttribute("ratings", songDao.findOne(id).getRatings());
        model.addAttribute("categories", songDao.findOne(id).getCategories());
        model.addAttribute("songHash", songDao.findOne(id).getSongHash());

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
        model.addAttribute("categories", categoryDao.findAll());
        return "songs/create";
    }

    @PostMapping("/songs/create")
    public String createSong(@ModelAttribute Song song,
                            @RequestParam(value = "categories", required = false)
                                    List<Category> categories,
                            @RequestParam(name = "title") String title,
                            @RequestParam(name = "description") String description,
                            @RequestParam(value = "songHash") String songHash) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (categories != null) {
                    song.setCategories(categories);
            }
            song.setUser(user);
            song.setTitle(title);
            song.setDescription(description);
            song.setSongHash(songHash);
            songDao.save(song);
        return "redirect:/users/profile";
    }

    @PostMapping("songs/{id}/view")
    public String saveComment(@PathVariable long id, @ModelAttribute Song song,
                              @RequestParam(value = "comment") Comment comment, Model model) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setUser(user);
        comment.setSong(song);
        commentDao.save(comment);
        return "redirect:/songs/" + song.getId();
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
