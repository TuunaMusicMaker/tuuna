package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;
import java.util.List;

@Controller
public class HomeController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    public HomeController(UserRepository userDao, SongRepository songDao, CommentRepository commentDao,
                          RatingRepository ratingDao) {
        this.userDao = userDao;
        this.songDao = songDao;
        this.commentDao = commentDao;
        this.ratingDao = ratingDao;
    }

    @GetMapping("/")
    public String homePage(Model model) {
        List<Song> recentSongs = Lists.newArrayList(songDao.findAll());
        if (recentSongs.size() > 0) {
            Collections.reverse(recentSongs);
            if (recentSongs.size() < 5) {
                recentSongs = recentSongs.subList(0, recentSongs.size());
            } else {
                recentSongs = recentSongs.subList(0, 5);
            }
            model.addAttribute("recentSongs", recentSongs);
        }
        return "home";
    }

    @GetMapping("/about-us")
    public String aboutUs() {
        return "about-us";
    }

    @GetMapping("/search")
    public String getSearchForm() {
        return "/search/index";
    }

//    @PostMapping("/search")
//    public String makeSearch(@RequestParam (name = "search-params") String params, @RequestParam (name = "query") String query) {
//        List<Song> searchResults;
//        switch(params) {
//            case("1"):
//                break;
//            case("2"):
//                break;
//            case("3"):
//                break;
//            default:
//                break;
//        }
//        return"redirect:/search/results";
//    }
}
