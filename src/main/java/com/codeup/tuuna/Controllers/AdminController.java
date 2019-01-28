package com.codeup.tuuna.Controllers;

import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

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
}
