INSERT INTO comments (resource_id, user_id, parent_id, posted_date, comment)
VALUES (1, 2, null, '2022-01-01', 'this video is cool!'),
(1, 1, 1, '2022-01-01', 'thank you!'),
(1, 2, 1, '2022-01-01', 'your welcome my bro'),
(1, 2, null, '2022-01-01', 'this video is great!'),
(1, 1, 4, '2022-01-01', 'thank you as well');