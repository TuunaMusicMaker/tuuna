package com.codeup.tuuna.Repositories;

import com.codeup.tuuna.Models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAllByUsernameContaining(String username);
}
