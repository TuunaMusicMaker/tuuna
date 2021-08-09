package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByUserId(long id);
    Comment findById(long id);
}
