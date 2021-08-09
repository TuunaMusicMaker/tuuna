USE tuuna_db;

INSERT INTO users (email, is_admin, is_banned, password, username, phone_number)
VALUES ('gary@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'gary', '4353245678'),
('mary@gmail.com', true, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'mary', '2353233678'),
('barry@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'barry', '2103232678'),
('jerry@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'jerry', '7543245988'),
('terri@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'terri', '9834674367'),
('john24@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'john', '7543245988'),
('howard@gmail.com', true, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'howard', '9834674367'),
('eddie@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'eddie', '9834674367'),
('angela@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'angela', '7543245988'),
('oscar@gmail.com', false, false, '$2a$10$0NK0/b7WK8RziM33gc07EuHl5zpeOD1eaFnLp3Gft8jRbC2taZoLO', 'oscar', '9834674367');

INSERT INTO songs (title, description, song_hash, is_flagged, user_id)
VALUES ('My amazing song!', 'Listen to this!', 'E3,D3,E3,E3,F3,F3,G3,A3,B3,B3,B3,A3,G3,F3,E3,E3,E3,E3,F3,F3,F3,G3,G3,A3|0:0:0.8,0:0:0.8,0:0:0.8,0:0:0.9,0:1:0.4,0:0:0.8,0:0:0.7,0:0:1.1,0:0:0.8,0:1:0.2,0:0:0.9,0:0:0.7,0:0:0.8,0:0:0.6,0:1:1.1,0:0:0.5,0:0:0.8,0:0:0.5,0:0:1.0,0:0:0.7,0:0:0.6,0:0:1.2,0:0:0.6,0:1:1.0|0:2:2.3,0:3:1.3,1:0:0.6,1:0:3.9,1:1:3.0,1:3:1.4,2:0:0.8,2:1:0.5,2:2:0.1,2:2:2.7,3:0:1.5,3:1:0.9,3:2:0.3,3:2:3.7,3:3:3.1,4:1:2.5,4:2:0.2,4:2:2.3,4:3:1.7,4:3:3.6,5:0:1.5,5:1:1.7,5:2:1.6,5:3:1.8', false, 1),
                ('Musical diddie', 'This song was inspired by my love for nature.', 'C3,D3,E3,F3,E3,G3,E3,E3,D3,D3,E3,F3,E3,G3,C3,G3,F3,E3|0:0:1.2,0:0:1.4,0:0:1.1,0:0:1.6,0:0:1.0,0:0:1.2,0:0:1.5,0:0:0.6,0:1:1.0,0:0:1.6,0:0:2.3,0:0:2.8,0:0:1.4,0:0:1.5,0:0:1.4,0:0:0.6,0:0:2.1,0:1:2.8|1:0:0.6,1:0:1.5,1:0:2.7,1:1:0.1,1:1:1.5,1:2:0.6,1:3:0.0,1:3:3.8,2:0:3.3,2:2:2.1,2:3:0.1,2:3:2.2,3:0:0.2,3:0:2.1,3:1:2.1,3:2:2.7,3:3:2.9,4:0:3.0', false, 2),
                ('Fight song', 'This is my school fight song, and it is better than anyone else because I rule.', 'C4,D4,E4,F4,F4,C4,D4,E4,E3,F3,E3,E3,D3,E3,G3,F3,D4|0:0:1.1,0:0:1.9,0:0:1.9,0:0:1.7,0:1:0.1,0:1:0.3,0:1:0.3,0:1:2.9,0:0:1.2,0:0:1.2,0:0:0.7,0:0:1.7,0:0:3.2,0:0:3.5,0:0:2.8,0:1:0.7,0:1:3.2|1:0:0.8,1:0:2.8,1:1:0.5,1:1:2.8,1:2:2.8,1:3:2.8,2:0:3.6,2:2:0.0,2:3:3.8,3:0:2.0,3:0:3.1,3:1:0.6,3:1:2.8,3:2:2.7,3:3:3.0,4:1:0.0,4:2:0.8', true, 3),
                ('Practice', 'Song I made for fun', 'C4,D4,E4,E4,D4,C4,C4,D4,E4,F4,D4,C4|0:0:1.4,0:0:1.3,0:0:1.4,0:0:1.6,0:0:1.9,0:1:2.8,0:0:0.8,0:0:1.0,0:0:1.2,0:1:0.0,0:0:3.5,0:1:1.9|1:2:1.4,1:2:3.9,1:3:2.0,2:0:2.3,2:1:2.6,2:2:3.7,3:1:0.7,3:1:2.9,3:2:0.8,3:3:1.2,4:0:2.3,4:1:3.3', false, 4),
                ('Best song ever', 'Wow, this application is so much fun. I love Tuuna Music Maker!', 'A4,G4,F4,F4,E4,A4,G4,F4,E4|0:0:0.9,0:0:1.0,0:0:3.9,0:0:3.7,0:0:3.5,0:0:0.9,0:0:0.8,0:1:0.0,0:1:1.3|1:2:3.7,1:3:2.1,2:0:0.6,2:1:1.7,2:2:3.3,3:0:0.7,3:0:3.4,3:1:2.1,3:3:0', false, 5),
                ('Summer song', 'This song reminds me of summertime fun.', 'C4,D4,E4,F4,F4,F4,E4,D4,C4,C3,E3,F3,G3,G3,E3,D4,E4,F4|0:0:2.9,0:0:3.0,0:0:2.4,0:1:3.1,0:0:2.8,0:0:2.6,0:1:0.2,0:0:2.0,0:1:2.1,0:0:1.4,0:0:1.8,0:0:1.9,0:1:2.9,0:1:0.2,1:1:0.5,0:3:2.7,0:3:0.0,0:1:3.6|1:2:1.3,1:3:0.4,1:3:3.2,2:0:2.2,2:2:2.5,2:3:2.3,3:0:2.1,3:1:1.7,3:2:2.1,4:0:2.3,4:1:2.0,4:2:1.8,4:3:2.2,5:1:2.7,5:2:2.9,5:3:2.9,6:0:3.0,6:1:3.3', false, 6),
                ('Winter wonderland', 'A whimsical song evoking thoughts of snow and hot cocoa.', 'B2,B2,B2,B2,B2,B2,B2,B2,D2,D2,D2,D2,D2,D2,D2,D2,G2,G2,G2,G2,G2,G2,G2,G2,E2,E2,E2,E2,E2,E2,E2,E2|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2|1:0:0,1:0:2,1:1:0,1:1:2,1:2:0,1:2:2,1:3:0,1:3:2,2:0:0,2:0:2,2:1:0,2:1:2,2:2:0,2:2:2,2:3:0,2:3:2,3:0:0,3:0:2,3:1:0,3:1:2,3:2:0,3:2:2,3:3:0,3:3:2,4:0:0,4:0:2,4:1:0,4:1:2,4:2:0,4:2:2,4:3:0,4:3:2', true, 7),
                ('Speedster', 'A cool fast song', 'B3,B4,B3,B4,B3,B4,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4,B3,B3,B3,D4,F#4,D4,A4|0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0,0:0:2,0:0:2,0:0:2,0:0:1,0:0:3,0:0:2,0:1:0|1:0:0,1:0:0,1:0:2,1:0:2,1:1:0,1:1:0,1:1:2,1:1:3,1:2:2,1:3:0,2:0:0,2:0:2,2:1:0,2:1:2,2:1:3,2:2:2,2:3:0,3:0:0,3:0:2,3:1:0,3:1:2,3:1:3,3:2:2,3:3:0,4:0:0,4:0:2,4:1:0,4:1:2,4:1:3,4:2:2,4:3:0', false, 8),
                ('Mysterious Melody', 'Enjoy my song that has odd notes and spooky tunes.', 'B4,A4,G4,F4,B4,A4,E3,E3,F3,G3,A3,C3,A4,B4,F4,C3|0:1:0.7,0:0:3.7,0:0:3.9,0:1:0.7,0:1:2.6,0:1:0.4,0:0:0.6,0:1:0.2,0:1:1.3,0:0:3.9,0:1:1.3,0:1:2.3,0:1:0.8,0:1:1.8,0:2:1.2,0:0:2.8|2:0:0.5,2:1:0.7,2:2:1.2,2:3:1.9,3:0:2.3,3:1:2.9,4:1:3.6,4:2:0.5,4:3:0.5,5:0:2.7,5:2:0.1,5:3:1.4,6:0:2.9,6:1:3.8,6:3:1.5,7:0:3.0', true, 9),
              ('After-hours', 'A song to wind down the evening.', 'B4,A4,G4,B4,A4,G4,F4,A4,G4,F4,A4,G4,F4|0:0:3.7,0:0:1.8,0:0:3.0,0:1:0.0,0:0:2.6,0:0:3,0:2:0.1,0:0:3.5,0:0:2.8,0:0:2.6,0:0:2.6,0:0:2.1,0:1:0.0|1:3:2.1,2:0:1.2,2:1:1.0,2:2:0.2,2:2:3.6,2:3:3.8,3:1:0.2,4:0:0.0,4:0:3.7,4:1:3.6,4:3:0.2,5:0:0.0,5:1:0.0', false, 10),
              ('Total eclipse', 'My attempt at Total Eclipse of the Heart!', 'A3,G3,E3,F3,F3,F3,E3,A3,G3,E3,F3,E3,D3,F4,E4,E4,D4,F4,D4,E3,D3,F4,E4,D4,E3,D3|0:0:0.7,0:0:1.0,0:0:3.1,0:0:0.7,0:0:1.4,0:0:1.6,0:1:1.6,0:0:1.8,0:0:1.3,0:0:2.1,0:0:1.4,0:1:0.8,0:1:2.0,0:0:2.6,0:0:1.9,0:0:2.8,0:0:3.4,0:1:3.5,1:0:0.3,1:0:2.3,0:3:1.1,0:1:0.8,0:0:3.0,0:2:0.9,0:2:2.9,0:1:3.0|0:3:0.6,0:3:3.4,1:0:2.5,1:0:2.5,1:1:1.5,1:2:0.7,1:3:2.5,2:1:1.1,2:2:0.7,2:2:3.3,2:3:1.9,3:0:0.8,3:1:3.1,3:3:2.2,4:0:1.8,4:1:1.4,4:2:1.2,4:3:0.8,5:1:0.2,5:2:3.8,6:0:0.5,6:1:0.4,6:2:0.0,6:2:3.9,6:3:3.8,7:0:3.7', false, 1);

INSERT INTO comments (body, is_flagged, song_id, user_id)
VALUES ('Cool song my dude!', false, 1, 1),
('Could be better', false, 2, 2),
('Great song', false, 3, 3),
('I like it a lot!', false, 4, 4),
('Amazing song', false, 5, 5),
('good try', false, 2, 2),
('Ha!! Your song sounds like a 4 year old made it!', true, 3, 3),
('Great effort, keep trying!', false, 4, 4),
('Now that is talent!', false, 5, 5),
('wow, so terrible', true, 2, 9),
('Love that intro!', false, 3, 3),
('What a masterpiece!', false, 4, 4),
('Not a very good song.', true, 5, 5),
('how interesting!', false, 10, 8),
('This is my favorite Tuuna song!', false, 9, 6),
('Not sure how I feel about this song.', false, 8, 7),
('so fun!', false, 10, 7),
('Hmmmm...not much of a resemblance there, gary.', false, 11, 5);

INSERT INTO ratings (song_id, user_id)
VALUES (1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(3, 9),
(3, 10),
(3, 4),
(3, 5),
(2, 7),
(2, 3),
(2, 4),
(1, 10),
(2, 1),
(6, 3),
(7, 4),
(4, 5);
