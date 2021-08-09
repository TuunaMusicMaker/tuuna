package com.codeup.tuuna.Repositories;

import com.codeup.tuuna.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Users extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(long id);
}
