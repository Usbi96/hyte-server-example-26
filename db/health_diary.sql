DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

--Create tables

CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  user_level VARCHAR(10) DEFAULT 'regular',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DiaryEntries (
  entry_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  mood VARCHAR(50),
  weight DECIMAL(5,2),
  sleep_hours INT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Training (
  training_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  training_date DATE NOT NULL,
  training_type VARCHAR(50),
  duration_minutes INT,
  calories INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Insert users
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'regular');

-- Insert diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out');

-- Insert training sessions
INSERT INTO Training (user_id, training_date, training_type, duration_minutes, calories) VALUES
  (1, '2024-01-10', 'Running', 45, 400),
  (1, '2024-01-12', 'Gym', 60, 500),
  (2, '2024-01-11', 'Cycling', 30, 250);

-- Select all users
SELECT * FROM Users;

-- Select all diary entries
SELECT * FROM DiaryEntries;

-- Select diary entries for user 1
SELECT * FROM DiaryEntries WHERE user_id = 1;

-- Select newest 2 diary entries
SELECT * FROM DiaryEntries ORDER BY created_at DESC LIMIT 2;

-- Select training sessions for user 1
SELECT * FROM Training WHERE user_id = 1 ORDER BY training_date DESC;

-- Join diary entries with username
SELECT DiaryEntries.*, Users.username
FROM DiaryEntries
JOIN Users ON DiaryEntries.user_id = Users.user_id;

-- Update user_level of user 1
UPDATE Users SET user_level = 'admin' WHERE user_id = 1;

-- Update mood of entry 1
UPDATE DiaryEntries SET mood = 'Outstanding' WHERE entry_id = 1;

-- Delete diary entry with id 2
DELETE FROM DiaryEntries WHERE entry_id = 2;
