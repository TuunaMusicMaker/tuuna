package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Song;
import org.springframework.data.repository.CrudRepository;

public interface SongRepository extends CrudRepository<Song, Long> {
}
