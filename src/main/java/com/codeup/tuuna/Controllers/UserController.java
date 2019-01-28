package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Comment;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.Users;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            return "redirect:/";
        }
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
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.isBanned()) {
            return "redirect:/you-got-banned";
        }
        user.setPhoneNumber(user.getPhoneNumber().substring(2));
        model.addAttribute("user", user);
        return "users/edit";
    }

    @PostMapping("/users/edit")
    public String saverUserUpdate(@ModelAttribute User user, @RequestParam(name = "username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password, @RequestParam(name = "password-confirm") String confirm, @RequestParam(name = "phoneNumber") String phoneNumber) {
        if (!password.equals(confirm)) {
            return "redirect:/users/edit";
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userDetails = (User) authentication.getPrincipal();
        userDetails.setUsername(username);
        userDetails.setPhoneNumber(phoneNumber);
        userDetails.setEmail(email);
        userDetails.setPassword(hash);
        return "redirect:/users/profile";
    }

    @GetMapping("/users/profile")
    public String getProfilePage(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.isBanned()) {
            return "redirect:/you-got-banned";
        }
        List<Song> userSongs = songs.findAllByUserId(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        List<Comment> userComments = comments.findAllByUserId(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        model.addAttribute("user", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        model.addAttribute("userSongs", userSongs);
        model.addAttribute("userComments", userComments);
        return "users/profile";
    }

    @GetMapping("/users/{id}")
    public String getOtherProfiles(@PathVariable long id, Model model) {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isBanned()) {
                return "redirect:/you-got-banned";
            }
            if (currentUser.getId() == id) {
                return "redirect:/users/profile";
            } else {
                model.addAttribute("currentUser", currentUser);
                model.addAttribute("isAdmin", currentUser.isAdmin());
                model.addAttribute("user", users.findOne(id));
                model.addAttribute("userIsAdmin", users.findOne(id).isAdmin());
                model.addAttribute("id", id);
                return "users/other-profile";
            }
        }
        return "redirect:/";
    }
}