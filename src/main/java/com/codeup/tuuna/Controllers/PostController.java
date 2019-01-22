package com.codeup.tuuna.Controllers;

import com.codeup.tuuna.Models.Post;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.PostRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import com.codeup.tuuna.Services.PostService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
public class PostController {

    private final PostService postService;
    private final PostRepository postDao;
    private final UserRepository userDao;

    public PostController(PostService postService, PostRepository postDao, UserRepository userDao) {
        this.postService = postService;
        this.postDao = postDao;
        this.userDao = userDao;
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/music")
    public String music() {
        return "music";
    }

    @GetMapping("/error")
    public String opps() {
        return "error";
    }

    @GetMapping("/posts")
    public String allPosts(Model model) {
        model.addAttribute("posts", postDao.findAll());
        return "posts/index";
    }

    @GetMapping("/posts/{id}")
    public String viewPostWithID(@PathVariable int id, Model model) {
        Post post = postDao.findOne((long) id);
        boolean isOwner;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            long tim =  ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            isOwner = post.getUser().getId() == tim;
    } else {
            isOwner = false;
        }
        model.addAttribute("post", post);
        model.addAttribute("isOwner", isOwner);
        return "posts/show";
    }

    @GetMapping("/posts/most-recent")
    public String viewMostRecentPost(Model model) {
        Post post = postDao.findFirstByOrderByIdDesc();
        boolean isOwner;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            long tim =  ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            isOwner = post.getUser().getId() == tim;
        } else {
            isOwner = false;
        }
        model.addAttribute("post", post);
        model.addAttribute("isOwner", isOwner);
        return "posts/show";
    }

    @GetMapping("/posts/create")
    public String showCreateForm(Model model) {
        model.addAttribute("post", new Post());
        return "posts/create";
    }

    @PostMapping("/posts/create")
    public String createPost(@ModelAttribute Post post) {
        post.setUser(userDao.findOne(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()));
        postDao.save(post);
        return "redirect:/posts";
    }

    @GetMapping("/posts/{id}/edit")
    public String showEditForm(@PathVariable int id, Model model) {
        Post post = postDao.findOne((long) id);
        model.addAttribute("id", id);
        model.addAttribute("post", post);
        boolean isOwner;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            long tim =  ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            isOwner = post.getUser().getId() == tim;
        } else {
            isOwner = false;
        }
        if (isOwner) {
            return "posts/edit";
        } else {
            return "redirect:/posts/{id}";
        }
    }

    @PostMapping("/posts/{id}/edit")
    public String updatePost(@PathVariable int id, @ModelAttribute Post post) {
        postDao.save(post);
        return "redirect:/posts/{id}";
    }

    @GetMapping("/posts/{id}/delete")
    public String checkForDelete(@PathVariable int id, Model model) {
        Post post = postDao.findOne((long) id);
        model.addAttribute("post", post);
        boolean isOwner;
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() != "anonymousUser") {
            long tim =  ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            isOwner = post.getUser().getId() == tim;
        } else {
            isOwner = false;
        }
        if (isOwner) {
            return "posts/delete";
        } else {
            return "redirect:/posts/{id}";
        }
    }

    @PostMapping("/posts/{id}/delete")
    public String deletePost(@PathVariable int id) {
        postDao.delete((long) id);
        return "redirect:/posts";
    }

}
