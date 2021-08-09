package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findById(long id);
}
