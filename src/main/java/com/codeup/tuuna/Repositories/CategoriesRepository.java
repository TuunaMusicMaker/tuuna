package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoriesRepository extends JpaRepository<Category, Long> {
    Category findById(long id);

}
