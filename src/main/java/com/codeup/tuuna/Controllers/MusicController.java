package com.codeup.tuuna.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MusicController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/music")
    public String music() {
        return "music";
    }

}
