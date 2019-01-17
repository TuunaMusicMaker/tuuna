package com.codeup.tuuna.Repositories;

import com.codeup.tuuna.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
