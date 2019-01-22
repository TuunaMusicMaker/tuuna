package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRespository extends CrudRepository<Category, Long> {
}
