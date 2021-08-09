package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.*;
import com.codeup.tuuna.Repositories.*;
import com.google.common.collect.Lists;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Controller
public class SongController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    private final CategoriesRepository categoryDao;

    @Value("${accountSID}")
    private String ACCOUNT_SID;

    @Value("${authTOKEN}")
    private String AUTH_TOKEN;

    @Value("${twilioNum}")
    private String TWILIO_NUM;

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

        List<Song> allSongs = Lists.newArrayList(songDao.findAll());
        Collections.reverse(allSongs);
        model.addAttribute("songs", allSongs);
        return "songs/index";
    }

    @GetMapping("/songs/{id}")
    public String getSong(@PathVariable long id, Model model) {
        String currentUserName = "";
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        if (!(user instanceof AnonymousAuthenticationToken)) {
            currentUserName = user.getName();
        }
        boolean isPoster = (currentUserName.equals(songDao.findById(id).getUser().getUsername()));

        List<Rating> ratings = songDao.findById(id).getRatings();
        Integer songLikes = songDao.findById(id).getRatings().size();
            if (songLikes == null) {
                songLikes = 0;
            }
        boolean hasRated = false;
            if(ratings.size() > 0) {
                for (Rating rating : ratings) {
                    if(rating.getUser().getUsername().equals(currentUserName)) {
                        hasRated = true;
                        break;
                    }
                }
            }
        List<Comment> comments = Lists.newArrayList(songDao.findById(id).getComments());
        Collections.reverse(comments);
        model.addAttribute("hasRated", hasRated);
        model.addAttribute("isPoster", isPoster);
        model.addAttribute("currentUsername", currentUserName);
        model.addAttribute("username", songDao.findById(id).getUser().getUsername());
        model.addAttribute("song", songDao.findById(id));
        model.addAttribute("id", id);
        model.addAttribute("comments", comments);
        model.addAttribute("comment", new Comment());
        model.addAttribute("ratings", songDao.findById(id).getRatings());
//        model.addAttribute("categories", songDao.findOne(id).getCategories());
        model.addAttribute("songHash", songDao.findById(id).getSongHash());
        model.addAttribute("songLikes", songLikes);

        return "songs/view";
    }

    @GetMapping("/songs/create")
    public String showCreateSong(Model model) {

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.isBanned()) {
            return "redirect:/you-got-banned";
        }
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

    @GetMapping("/songs/{id}/edit")
    public String showEditSong(@PathVariable long id, Model model) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.isBanned()) {
            return "redirect:/you-got-banned";
        }
        model.addAttribute("id", id);
        model.addAttribute("song", songDao.findById(id));
        return "songs/edit";
    }

    @PostMapping("/songs/{id}/edit")
    public String editSong(@PathVariable long id, @ModelAttribute Song song, @RequestParam(name = "title") String title,
                           @RequestParam(name = "description") String description) {

        song.setUser(songDao.findById(id).getUser());
        song.setTitle(title);
        song.setDescription(description);
        song.setSongHash(songDao.findById(id).getSongHash());
        songDao.save(song);
        return "redirect:/songs/" + id;
    }

    @GetMapping("/songs/{id}/delete")
    public String showDeleteSong(@PathVariable long id, Model model) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.isBanned()) {
            return "redirect:/you-got-banned";
        }
        model.addAttribute("id", id);
        return "songs/delete";
    }
    @PostMapping("/songs/{id}/delete")
    public String deleteSong(@PathVariable long id, @ModelAttribute Song song) {
        List<Category> categories = songDao.findById(id).getCategories();
        songDao.findById(id).getCategories().removeAll(categories);
        songDao.delete(songDao.findById(id));
        return "redirect:/users/profile";
    }

    @PostMapping("/songs/{id}/rating")
    public String likeSong(@PathVariable long id, @ModelAttribute Song song) {
        User ratingUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Song ratedSong = songDao.findById(id);
        Rating rating = new Rating(ratedSong, ratingUser);
        ratingDao.save(rating);

        return "redirect:/songs/{id}";
    }

    @GetMapping("songs/{id}/flag")
    public String flagSongConfirm(@PathVariable long id, Model model) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.isBanned()) {
            return "redirect:/you-got-banned";
        }
        model.addAttribute("song", songDao.findById(id));
        model.addAttribute("id", id);
        return "songs/flag";
    }

    @PostMapping("songs/{id}/flag")
    public String flagSong(@PathVariable long id) {
        Song flaggedSong = songDao.findById(id);
        flaggedSong.setFlagged(true);
        songDao.save(flaggedSong);
        return "redirect:/songs/{id}";
    }

    @PostMapping("songs/{id}/comment")
    public String saveComment(@PathVariable long id, @ModelAttribute Song song,
                              @RequestParam(name = "body") String body) {
        Comment comment = new Comment();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setBody(body);
        comment.setUser(user);
        comment.setSong(songDao.findById(id));
        comment.setFlagged(false);
        commentDao.save(comment);
        return "redirect:/songs/" + id;
    }
    @PostMapping("comments/{id}/edit")
    public String editComment(@PathVariable long id,
                              @RequestParam(name = "body") String body) {
        Comment comment = commentDao.findById(id);
        comment.setBody(body);
        comment.setUser(commentDao.findById(id).getUser());
        comment.setSong(commentDao.findById(id).getSong());
        comment.setFlagged(false);
        commentDao.save(comment);
        return "redirect:/songs/" + commentDao.findById(id).getSong().getId();
    }

    @PostMapping("/comment/{commentId}/flag")
    public String flagComment(@PathVariable long commentId) {
        Comment flaggedComment = commentDao.findById(commentId);
        flaggedComment.setFlagged(true);
        commentDao.save(flaggedComment);
        long id = commentDao.findById(commentId).getSong().getId();
        return "redirect:/songs/" + id;
    }

    @PostMapping("/comments/{id}/delete")
    public String deleteComment(@PathVariable long id) {

        Comment comment = commentDao.findById(id);
        int redirect = (int) comment.getSong().getId();
        commentDao.delete(comment);
        return "redirect:/songs/" + redirect;
    }

    @PostMapping("songs/{id}/message")
    public String sendMessage(@PathVariable long id, @RequestParam(name = "recipient") String recipient) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = user.getUsername();
        String messageBody = "Check out this song on Tuuna Music Maker sent to you by Tuuna user:" + username + " tuuna.one/songs/" + id;
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message
                .creator(new PhoneNumber("+1" + recipient), // to
                        new PhoneNumber(TWILIO_NUM), // from
                        messageBody)
                .create();

        System.out.println(message.getSid());

        return "redirect:/songs/" + id;
    }

}
