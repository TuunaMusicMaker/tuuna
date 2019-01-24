package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Comment;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.Users;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class UserController {
    private Users users;
    private SongRepository songs;
    private CommentRepository comments;
    private PasswordEncoder passwordEncoder;

    public UserController(Users users, SongRepository songs, CommentRepository comments, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.songs = songs;
        this.comments = comments;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String showSignupForm(Model model){
        model.addAttribute("user", new User());
        return "users/register";
    }

    @PostMapping("/register")
    public String saveUser(@ModelAttribute User user, @RequestParam(name = "username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password, @RequestParam(name = "password-confirm") String confirm, @RequestParam(name = "phone-number") String phoneNumber) {
        if (!password.equals(confirm)) {
            return "redirect:/register";
        }
        String hash = passwordEncoder.encode(password);
        phoneNumber = "+1" + phoneNumber;
        user.setPassword(hash);
        user.setUsername(username);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAdmin(false);
        user.setBanned(false);
        users.save(user);
        return "redirect:/login";
    }

    @GetMapping("/users/edit")
    public String showUserEditForm(Model model) {
        model.addAttribute("user", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return "users/edit";
    }

    @PostMapping("/users/edit")
    public String saverUserUpdate(@ModelAttribute User user, @RequestParam(name = "username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password, @RequestParam(name = "password-confirm") String confirm, @RequestParam(name = "phone-number") String phoneNumber) {
        String hash = passwordEncoder.encode(password);
        phoneNumber = "+1" + phoneNumber;
        user.setPassword(hash);
        user.setUsername(username);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAdmin(false);
        user.setBanned(false);
        users.save(user);
        return "redirect:/users/profile";
    }

    @GetMapping("/users/profile")
    public String getProfilePage(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Song> userSongs = songs.findAllByUserId(user.getId());
        List<Comment> userComments = comments.findAllByUserId(user.getId());
        model.addAttribute("user", user);
        model.addAttribute("userSongs", userSongs);
        model.addAttribute("userComments", userComments);
        return "users/profile";
    }
}