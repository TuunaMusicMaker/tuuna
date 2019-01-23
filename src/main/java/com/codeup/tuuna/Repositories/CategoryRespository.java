package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRespository extends CrudRepository<Category, Long> {
    void saveAll(List<Category> categories);
}
