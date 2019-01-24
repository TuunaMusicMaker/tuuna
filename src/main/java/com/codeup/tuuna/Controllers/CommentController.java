package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Comment;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CommentRepository;
import com.codeup.tuuna.Repositories.RatingRepository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CommentController {

    private final UserRepository userDao;

    private final SongRepository songDao;

    private final CommentRepository commentDao;

    private final RatingRepository ratingDao;

    public CommentController(UserRepository userDao, SongRepository songDao, CommentRepository commentDao,
                          RatingRepository ratingDao) {
        this.userDao = userDao;
        this.songDao = songDao;
        this.commentDao = commentDao;
        this.ratingDao = ratingDao;
    }

    @GetMapping("/comments")
    public String getComments(Model model) {

        model.addAttribute("comments", commentDao.findAll());
        return "comments/index";
    }

    @GetMapping("/comments/{id}")
    public String getComment(@PathVariable long id, Model model) {

        model.addAttribute("username", commentDao.findOne(id).getUser().getUsername());
        model.addAttribute("comment", commentDao.findOne(id));
        model.addAttribute("id", id);
        model.addAttribute("song", commentDao.findOne(id).getSong());
        model.addAttribute("ratings", commentDao.findOne(id).getSong().getRatings());
        model.addAttribute("categories", commentDao.findOne(id).getSong().getCategories());

        return "comments/view";
    }

    @GetMapping("/comments/{id}/edit")
    public String showEditComment(@PathVariable long id, Model model) {
        model.addAttribute("id", id);
        model.addAttribute("comment", commentDao.findOne(id));
        return "comments/create";
    }

    @GetMapping("/comments/create")
    public String showCreateComment(Model model) {
        model.addAttribute("comment", new Comment());
        return "comments/create";
    }

    @PostMapping("/comments/create")
    public String createComment(@ModelAttribute Comment comment, User user, Song song) {
        comment.setUser(user);
        comment.setSong(song);
        commentDao.save(comment);
        return "redirect:/comments";
    }

    @PostMapping("/comments/{id}/edit")
    public String editComment(@PathVariable long id, @ModelAttribute Comment comment) {
        commentDao.save(comment);
        return "redirect:/comments/" + comment.getId();
    }

    @PostMapping("/comments/{id}/delete")
    public String deleteComment(@PathVariable long id, @ModelAttribute Comment comment) {
        commentDao.delete(id);
        return "redirect:/comments";
    }

}
