package com.codeup.tuuna.Controllers;

import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.Users;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {
    private Users users;
    private PasswordEncoder passwordEncoder;

    public UserController(Users users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String showSignupForm(Model model){
        model.addAttribute("user", new User());
        return "users/register";
    }

    @PostMapping("/register")
    public String saveUser(@ModelAttribute User user, @RequestParam(name = "username") String username, @RequestParam(name = "email") String email, @RequestParam(name = "password") String password, @RequestParam(name = "password-confirm") String confirm) {
        if (!password.equals(confirm)) {
            return "redirect:/register";
        }
        String hash = passwordEncoder.encode(user.getPassword());
        user.setPassword(hash);
        users.save(user);
        return "redirect:/login";
    }
}