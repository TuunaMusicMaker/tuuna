package com.codeup.tuuna.Repositories;
import com.codeup.tuuna.Models.Song;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findAllByUserId(long id);
    List<Song> findAllByTitleContaining(String title);
    Song findById(long id);

    @Query(value = "SELECT songs.* FROM songs LEFT OUTER JOIN ratings ON songs.id = ratings.song_id GROUP BY songs.id ORDER BY COUNT(ratings.id) DESC, songs.id DESC LIMIT 5", nativeQuery = true)
    List<Song> sortRatingsBest5();
}
