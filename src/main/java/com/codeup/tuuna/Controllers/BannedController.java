package com.codeup.tuuna.Controllers;

import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BannedController {
    private final UserRepository userDao;

    public BannedController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/you-got-banned")
    public String youDoneGoofed() {
        if (!SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (currentUser.isBanned()) {
                return "banned";
            }
        }
        return "redirect:/";
    }
}
