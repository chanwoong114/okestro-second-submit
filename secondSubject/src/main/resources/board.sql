CREATE TABLE `user` (
                        `user_id`	int AUTO_INCREMENT PRIMARY KEY,
                        `email`	varchar(30)	NOT NULL,
                        `passwd`	varchar(64)	NOT NULL,
                        `name`	varchar(20)	NOT NULL,
                        `nickname`	varchar(20)	NOT NULL,
                        `refresh_token` varchar(256)
);


CREATE TABLE `board` (
                         `board_id`	bigint AUTO_INCREMENT PRIMARY KEY,
                         `user_id` INT,
                         `title`	varchar(100)	NOT NULL,
                         `content`	text,
                         `created_at`	datetime	NOT NULL,
                         `updated_at`	datetime	NOT NULL,
                         FOREIGN KEY (user_id) REFERENCES user(user_id)
);