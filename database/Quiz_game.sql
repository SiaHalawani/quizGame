DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `answerID` int NOT NULL AUTO_INCREMENT,
  `questionID` int DEFAULT NULL,
  `answerText` varchar(255) NOT NULL,
  `isCorrect` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`answerID`),
  KEY `answers_ibfk_1` (`questionID`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionID`) REFERENCES `questions` (`questionID`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `answers` VALUES 
(1, 6, 'true', 0),
(2, 6, 'false', 1),
(3, 6, 'false', 1),
(4, 6, 'false', 1);

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `questionID` int NOT NULL AUTO_INCREMENT,
  `quizID` int DEFAULT NULL,
  `questionText` varchar(255) NOT NULL,
  `correctAnswer` varchar(255) NOT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`questionID`),
  KEY `questions_ibfk_1` (`quizID`),
  KEY `unique_constraint_name` (`userID`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `unique_constraint_name` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `questions` VALUES 
(1, 12, 'o call a base class constructor in a derived class, is it needed to call the base class initializer.', 'false', 1),
(2, 15, 'What is x2 + 1 differentiated with respect to x?', '2x', 2),
(3, 15, 'What will be the derivative of this function - \'f(x) = 1963\'?', '0', 2);


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES 
(1, 'dr hamid', 'hamid@balamand.edu.lb', 'StrongPass@ASDQ'),
(2, 'dr amin', 'amin@balamand.edu.lb', 'amin#!$S'),
(3, 'dr charbel', 'charbel@balamand.edu.lb', 'charbel#!$S'),
(4, 'dr bilal', 'bilal@balamand.edu.lb', 'bilal#!$S'),
(5, 'dr antoine', 'antoine@balamand.edu.lb', 'StrongPass@4145'),
(6, 'dr yousef', 'yousef@balamand.edu.lb', 'yousef#!$S');


DROP TABLE IF EXISTS `quizzes`;

CREATE TABLE `quizzes` (
  `quizID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `duration` int DEFAULT NULL,
  PRIMARY KEY (`quizID`),
  KEY `quiz_ibfk_2` (`userID`),
  CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) 
  ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) 
  ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `quizzes` VALUES 
(1, 1, 'OOP quiz', 'chapter 8 and 9', 35),
(2, 2, 'proba QUIZ', 'Chapter 1', 30),
(3, 2, 'Calculs quiz', 'series', 20);

DROP TABLE IF EXISTS `results`;

CREATE TABLE `results` (
  `resultID` int NOT NULL AUTO_INCREMENT,
  `playerID` int DEFAULT NULL,
  `quizID` int DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`resultID`),
  KEY `result_ibfk_1` (`playerID`),
  KEY `result_ibfk_2` (`quizID`),
  CONSTRAINT `result_ibfk_1` FOREIGN KEY (`playerID`) REFERENCES `players` (`playerID`) 
  ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `result_ibfk_2` FOREIGN KEY (`quizID`) REFERENCES `quizzes` (`quizID`) 
  ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `results` VALUES 
(1, 1, 1, 50.00),
(2, 2, 3, 70.00),
(3, 3, 1, 50.00),
(4, 4, 3, 70.00),
(5, 5, 3, 70.00),
(6, 6, 3, 80.00),
(7, 6, 3, 80.00),
(8, 6, 3, 80.00);

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `playerID` int NOT NULL AUTO_INCREMENT,
  `playerUsername` varchar(255) NOT NULL,
  `playerEmail` varchar(255) NOT NULL,
  `playerPassword` varchar(255) NOT NULL,
  `playerStartTime` int DEFAULT NULL,
  `playerEndTime` int DEFAULT NULL,
  PRIMARY KEY (`playerID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `players` VALUES 
(1, 'sondos halawani', 'sondos.halawani@std.balamand.edu.lb', 'SONDOS!!!!!', NULL, NULL),
(2, 'mokhtar besmar', 'mokhtar.besmar@std.balamand.edu.lb', 'MOKHTAR!!!!!', NULL, NULL),
(3, 'David Kharrat', 'david.kharat@std.balamand.edu.lb', 'DAVID!!!!!', NULL, NULL);

DROP TABLE IF EXISTS `players_results`;

CREATE TABLE `players_results` (
  `playerID` int NOT NULL,
  `resultID` int NOT NULL,
  PRIMARY KEY (`playerID`, `resultID`),
  CONSTRAINT `fk_players_results_player` FOREIGN KEY (`playerID`) REFERENCES `players` (`playerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_players_results_result` FOREIGN KEY (`resultID`) REFERENCES `results` (`resultID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `players_results` VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(6, 7),
(6, 8);