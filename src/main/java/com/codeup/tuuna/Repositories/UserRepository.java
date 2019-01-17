package com.codeup.tuuna.Repositories;

import com.codeup.codeupblog.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
