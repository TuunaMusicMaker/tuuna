package com.codeup.tuuna.Controllers;
import com.codeup.tuuna.Models.Category;
import com.codeup.tuuna.Repositories.CategoriesRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CategoriesController {

    private CategoriesRepository categoriesRepository;

    @GetMapping("categories/{id}")
    public String showSongsByCategory(@PathVariable long id, Model model) {
        Category category = categoriesRepository.findOne(id);
        model.addAttribute("songs", category.getSongs());
        return "songs/index";
    }
}
