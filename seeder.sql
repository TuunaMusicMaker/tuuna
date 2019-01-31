INSERT INTO categories (category)
VALUES ('awesome'),
('boring'),
('inspiring'),
('quirky'),
('romantic'),
('spooky'),
('uplifting');

INSERT INTO users (email, is_admin, is_banned, password, username, phone_number)
VALUES ('gary@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'gary', '4353245678'),
('mary@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'mary', '2353233678'),
('barry@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'barry', '2103232678'),
('jerry@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'jerry', '7543245988'),
('terry@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'terry', '9834674367');

INSERT INTO songs (title, description, song_hash, is_flagged, user_id)
VALUES ('My amazing song!', 'Listen to this!', 'B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2', false, 1),
                ('My horrible song!', 'Do not listen to this', 'B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0', false, 2),
                ('Random song', 'Song I created work in progress', 'B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2', false, 3),
                ('Practice', 'Song I made for fun', 'B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0', false, 4),
                ('Best song ever', 'QWE Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque commodi eligendi necessitatibus voluptates. At distinctio dolores minus molestiae mollitia nemo sapiente ut veniam voluptates! Corporis distinctio error quaerat vel!', 'B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2', false, 5);

INSERT INTO comments (body, is_flagged, song_id, user_id)
VALUES ('Cool song my dude!', false, 1, 1),
('Could be better', false, 2, 2),
('Great song', false, 3, 3),
('I like it alot!', false, 4, 4),
('Amazing song', false, 5, 5);

INSERT INTO ratings (song_id, user_id)
VALUES (1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

INSERT INTO songs_categories (song_id, category_id)
VALUES (1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);