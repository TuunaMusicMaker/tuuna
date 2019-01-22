package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Comment;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long> {
}
