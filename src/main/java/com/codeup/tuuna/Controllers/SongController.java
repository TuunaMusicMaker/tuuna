package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class SongController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    public SongController(UserRepository userDao, SongRepository songDao) {
        this.userDao = userDao;
        this.songDao = songDao;
    }

    @GetMapping("/songs")
    public String getSongs(Model model) {

        model.addAttribute("songs", songDao.findAll());
        return "songs/index";
    }

    @GetMapping("/songs/{id}")
    public String getSong(@PathVariable long id, Model model) {

        model.addAttribute("username", songDao.findOne(id).getUser().getEmail());
        model.addAttribute("song", songDao.findOne(id));
        model.addAttribute("id", id);

        return "songs/view";
    }

}
