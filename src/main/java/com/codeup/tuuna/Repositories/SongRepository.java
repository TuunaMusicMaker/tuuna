package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Song;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SongRepository extends CrudRepository<Song, Long> {
    List<Song> findAllByUserId(long id);
}
