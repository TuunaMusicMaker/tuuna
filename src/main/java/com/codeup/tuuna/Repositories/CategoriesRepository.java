package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoriesRepository extends CrudRepository<Category, Long> {
}
