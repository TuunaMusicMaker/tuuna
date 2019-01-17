package com.codeup.tuuna.Repositories;

import com.codeup.tuuna.Models.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
    Post findFirstByOrderByIdDesc();
}
