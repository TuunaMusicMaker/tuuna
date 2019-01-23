package com.codeup.tuuna.Seeders;
import com.codeup.tuuna.Models.Category;
import com.codeup.tuuna.Models.Song;
import com.codeup.tuuna.Models.User;
import com.codeup.tuuna.Repositories.CategoryRespository;
import com.codeup.tuuna.Repositories.SongRepository;
import com.codeup.tuuna.Repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final SongRepository songDao;
    private final UserRepository userDao;
    private final CategoryRespository categoryDao;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.env}")
    private String environment;


    public DatabaseSeeder(SongRepository songDao, UserRepository userDao, CategoryRespository categoryDao, PasswordEncoder passwordEncoder) {
        this.songDao = songDao;
        this.userDao = userDao;
        this.categoryDao = categoryDao;
        this.passwordEncoder = passwordEncoder;
    }

    private void seedCategories(){

        List<Category> categories = Arrays.asList(
                new Category("awesome"),
                new Category("boring"),
                new Category("inspiring"),
                new Category("quirky"),
                new Category("romantic"),
                new Category("spooky"),
                new Category("uplifting")
        );

        categoryDao.saveAll(categories);
    }

    // generate a list of users and return it after saving
    private List<User> seedUsers() {
        List<User> users = Arrays.asList(
                new User("zach", "zach@codeup.com", "zach34", "1239874568", false, false),
                new User("luis", "luis@codeup.com", "luis34", "1239874568", false, false),
                new User("fer", "fer@codeup.com", "fer34", "1239874568", false, false),
                new User("ryan", "ryan@codeup.com", "ryan34", "1239874568", false, false),
                new User("justin", "justin@codeup.com", "justin34", "1239874568", false, false)
        );
        userDao.save(users);
        return users;
    }

    // generate a handful of songs, and randomly assign a user to each one
    private void seedSongs(List<User> users) {
        Song longSong = new Song(
                "Example 1",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque commodi eligendi necessitatibus voluptates. At distinctio dolores minus molestiae mollitia nemo sapiente ut veniam voluptates! Corporis distinctio error quaerat vel!"
        , "B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0");
        List<Song> songs = Arrays.asList(
                new Song("Title 1", "Description 1", "B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2"),
                new Song("Title 2", "Description 2", "B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0"),
                new Song("Title 3", "Description 3", "B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2"),
                new Song("Title 4", "Description 4", "B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0"),
                new Song("Example 2", "QWE Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque commodi eligendi necessitatibus voluptates. At distinctio dolores minus molestiae mollitia nemo sapiente ut veniam voluptates! Corporis distinctio error quaerat vel!", "B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2"),
                new Song("Example 3", "ASD Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque commodi eligendi necessitatibus voluptates. At distinctio dolores minus molestiae mollitia nemo sapiente ut veniam voluptates! Corporis distinctio error quaerat vel!", "B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0"),
                longSong
        );
        Random r = new Random();
        for (Song p : songs) {
            User randomUser = users.get(r.nextInt(users.size()));
            p.setUser(randomUser);
        }
        songDao.save(songs);
    }


    @Override
    public void run(String... strings) throws Exception {
        if (! environment.equals("development")) {
            log.info("app.env is not development, doing nothing.");
            return;
        }
        log.info("Deleting posts...");
        songDao.deleteAll();
        log.info("Deleting users...");
        userDao.deleteAll();
        log.info("Seeding users...");
        List<User> users = seedUsers();
        log.info("Seeding posts...");
        seedSongs(users);
        log.info("Finished running seeders!");
    }








}