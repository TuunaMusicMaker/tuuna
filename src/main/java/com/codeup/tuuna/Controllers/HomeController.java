package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Category;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

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

        List<Song> allSongs = Lists.newArrayList(songDao.findAll());
        List<Song> likedSongs = new ArrayList<>();
        if (allSongs.size() > 0) {
            Song holdThis = allSongs.get(0);
            if (allSongs.size() >= 5) {
                for (int i = 1; i <= 5; i += 1) {
                    for (Song song : allSongs) {
                        if (song.getRatings() != null) {
                            if (song.getRatings().size() >= holdThis.getRatings().size()) {
                                holdThis = song;
                            }
                        }
                    }
                    if (holdThis.getRatings() != null) {
                        allSongs.remove(holdThis);
                        likedSongs.add(holdThis);
                    }
                }
            } else {
                for (int i = 1; i <= allSongs.size(); i += 1) {
                    for (Song song : allSongs) {
                        if (song.getRatings() != null) {
                            System.err.println(song.getRatings().size());
                            if (song.getRatings().size() >= holdThis.getRatings().size()) {
                                holdThis = song;
                            }
                        }
                    }
                    if (holdThis.getRatings() != null) {
                        allSongs.remove(holdThis);
                        likedSongs.add(holdThis);
                    }
                }
            }
        }

        if (likedSongs.size() > 0) {
            model.addAttribute("likedSongs", likedSongs);
        }

        return "home";
    }

    @GetMapping("/about-us")
    public String aboutUs() {
        return "about-us";
    }

    @GetMapping("/search")
    public String getSearchForm() {
        return "search/index";
    }

    @PostMapping("/search")
    public String makeSearch(Model model,@RequestParam (name = "search-params") String params, @RequestParam (name = "query") String query) {
        List<Song> searchResults;
        switch(params) {
            case("1"):
                searchResults = new ArrayList<>();
                List<Song> allSongs = Lists.newArrayList(songDao.findAll());
                for (Song song : allSongs) {
                    List<Category> cats =  song.getCategories();
                    boolean addMe = false;
                    for (Category cat : cats) {
                        if (cat.getCategory().contains(query)) {
                            addMe = true;
                        }
                    }
                    if (addMe) {
                        searchResults.add(song);
                    }
                }
                model.addAttribute("searchResults", searchResults);
                break;
            case("2"):
                searchResults = songDao.findAllByTitleContaining(query);
                for(Song result : searchResults) {
                    System.err.println(result.getTitle());
                }
                model.addAttribute("searchResults", searchResults);
                break;
            case("3"):
                searchResults = new ArrayList<>();
                List<User> users = userDao.findAllByUsernameContaining(query);
                for (User user : users) {
                    searchResults.addAll(songDao.findAllByUserId(user.getId()));
                }
                model.addAttribute("searchResults", searchResults);
                break;
            default:
                searchResults = songDao.findAllByTitleContaining(query);
                List<User> usersMaster = userDao.findAllByUsernameContaining(query);
                for (User user : usersMaster) {
                    searchResults.addAll(songDao.findAllByUserId(user.getId()));
                }
                List<Song> allSongsAllSearch = Lists.newArrayList(songDao.findAll());
                for (Song song : allSongsAllSearch) {
                    List<Category> cats =  song.getCategories();
                    boolean addMe = false;
                    for (Category cat : cats) {
                        if (cat.getCategory().contains(query)) {
                            addMe = true;
                        }
                    }
                    if (addMe) {
                        searchResults.add(song);
                    }
                }
                Set<Song> holdUp = new HashSet<>(searchResults);
                searchResults = new ArrayList<>(holdUp);
                model.addAttribute("searchResults", searchResults);
                break;
        }
        return "search/results";
    }

    @GetMapping("/search/results")
    public String showResults(@ModelAttribute (name = "searchResults") ArrayList<Song> searchResults) {
        return "search/results";
    }
}
