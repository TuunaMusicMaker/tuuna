package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findAllByUserId(long id);
}
