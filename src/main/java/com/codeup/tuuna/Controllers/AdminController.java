package com.codeup.tuuna.Controllers;

import com.codeup.tuuna.Models.Category;
import com.codeup.tuuna.Models.Comment;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import com.google.common.collect.Lists;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Controller
public class AdminController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    public AdminController(UserRepository userDao, SongRepository songDao, CommentRepository commentDao,
                          RatingRepository ratingDao) {
        this.userDao = userDao;
        this.songDao = songDao;
        this.commentDao = commentDao;
        this.ratingDao = ratingDao;
    }

    @GetMapping("/admin/{id}/ban-user")
    public String getBanUserForm(@PathVariable long id, Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isBanned()) {
                return "redirect:/you-got-banned";
            }
            if (currentUser.isAdmin()) {
                model.addAttribute("user", userDao.findOne(id));
                return "admin/ban-user";
            }
        }
        return "redirect:/users/{id}";
    }

    @PostMapping("/admin/{id}/ban-user")
    public String banUser(@PathVariable long id) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                User bannedUser = userDao.findOne(id);
                bannedUser.setBanned(true);
                userDao.save(bannedUser);
                return "redirect:/";
            }
        }
        return "redirect:/users/{id}";
    }

    @GetMapping("/admin/{id}/promote")
    public String showPromoteUserForm(@PathVariable long id, Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser") || userDao.findOne(id).isAdmin()) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isBanned()) {
                return "redirect:/you-got-banned";
            }
            if (currentUser.isAdmin()) {
                model.addAttribute("user", userDao.findOne(id));
                return "admin/promote-user";
            }
        }
        return "redirect:/users/{id}";
    }

    @PostMapping("/admin/{id}/promote")
    public String promoteUser(@PathVariable long id) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser") || userDao.findOne(id).isAdmin()) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                User newAdmin = userDao.findOne(id);
                newAdmin.setAdmin(true);
                userDao.save(newAdmin);
                return "redirect:/users/{id}";
            }
        }
        return "redirect:/users/{id}";
    }

    @GetMapping("/admin/{id}/demote")
    public String showDemoteUserForm(@PathVariable long id, Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser") || !userDao.findOne(id).isAdmin()) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isBanned()) {
                return "redirect:/you-got-banned";
            }
            if (currentUser.isAdmin()) {
                model.addAttribute("user", userDao.findOne(id));
                return "admin/demote-admin";
            }
        }
        return "redirect:/users/{id}";
    }

    @PostMapping("/admin/{id}/demote")
    public String demoteUser(@PathVariable long id) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser") || !userDao.findOne(id).isAdmin()) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                User demotedAdmin = userDao.findOne(id);
                demotedAdmin.setAdmin(false);
                userDao.save(demotedAdmin);
                return "redirect:/users/{id}";
            }
        }
        return "redirect:/users/{id}";
    }

    @GetMapping("/admin/portal")
    public String showPortal() {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                return "admin/admin-portal";
            }
        }
        return "redirect:/";
    }

    @GetMapping("/admin/flagged/songs")
    public String showFlaggedSongs(Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                List<Song> allSongs = Lists.newArrayList(songDao.findAll());
                List<Song> flaggedSongs = new ArrayList<>();
                for (Song song : allSongs) {
                    if (song.isFlagged()) {
                        flaggedSongs.add(song);
                    }
                }
                model.addAttribute("flaggedSongs", flaggedSongs);
                return "admin/flagged-songs";
            }
        }
        return "redirect:/";
    }

    @PostMapping("/songs/{id}/flag/admin")
    public String unflagSong(@PathVariable long id) {
        Song target = songDao.findOne(id);
        target.setFlagged(false);
        songDao.save(target);
        return "redirect:/admin/flagged/songs";
    }

    @PostMapping("/songs/{id}/delete/admin")
    public String deleteSong(@PathVariable long id, @ModelAttribute Song song) {
        List<Category> categories = songDao.findOne(id).getCategories();
        songDao.findOne(id).getCategories().removeAll(categories);
        songDao.delete(id);
        return "redirect:/admin/flagged/songs";
    }

    @GetMapping("/admin/flagged/comments")
    public String showFlaggedComments(Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isAdmin()) {
                List<Comment> allComments = Lists.newArrayList(commentDao.findAll());
                List<Comment> flaggedComments = new ArrayList<>();
                for (Comment comment : allComments) {
                    if (comment.isFlagged()) {
                        flaggedComments.add(comment);
                    }
                }
                model.addAttribute("flaggedComments", flaggedComments);
                return "admin/flagged-comments";
            }
        }
        return "redirect:/";
    }

    @PostMapping("/comments/{id}/flag/admin")
    public String unflagComment(@PathVariable long id) {
        Comment target = commentDao.findOne(id);
        target.setFlagged(false);
        commentDao.save(target);
        return "redirect:/admin/flagged/comments";
    }

    @PostMapping("/comments/{id}/delete/admin")
    public String deleteComment(@PathVariable long id, @ModelAttribute Comment comment) {
        commentDao.delete(id);
        return "redirect:/admin/flagged/comments";
    }

}
