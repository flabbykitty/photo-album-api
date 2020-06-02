-- --------------------------------------------------------
-- Värd:                         eu-cdbr-west-03.cleardb.net
-- Serverversion:                5.6.47-log - MySQL Community Server (GPL)
-- Server-OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumpar databasstruktur för heroku_3c1312c6bf327d5
CREATE DATABASE IF NOT EXISTS `heroku_3c1312c6bf327d5` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_3c1312c6bf327d5`;

-- Dumpar struktur för tabell heroku_3c1312c6bf327d5.albums
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_3c1312c6bf327d5.albums: ~3 rows (ungefär)
DELETE FROM `albums`;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` (`id`, `title`, `user_id`) VALUES
	(1, 'Trees', 1),
	(11, 'Cars', 11),
	(21, 'Bunnies', 11);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_3c1312c6bf327d5.albums_photos
CREATE TABLE IF NOT EXISTS `albums_photos` (
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_3c1312c6bf327d5.albums_photos: ~9 rows (ungefär)
DELETE FROM `albums_photos`;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;
INSERT INTO `albums_photos` (`album_id`, `photo_id`) VALUES
	(1, 11),
	(1, 21),
	(1, 31),
	(1, 41),
	(11, 51),
	(11, 61),
	(11, 71),
	(21, 81),
	(21, 91);
/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_3c1312c6bf327d5.photos
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_3c1312c6bf327d5.photos: ~10 rows (ungefär)
DELETE FROM `photos`;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
	(1, 'Cute white bunny', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'This is a comment', 4),
	(11, 'Foggy forest', 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', '', 1),
	(21, 'Very green trees', 'https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', '', 1),
	(31, 'My favourite tree', 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', '', 1),
	(41, 'Old man willow', 'https://images.unsplash.com/photo-1563136060-ccd30423de88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'Down by the Withywindle', 1),
	(51, 'Ford Mustang', 'https://images.unsplash.com/photo-1559572607-1a34841ee4eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', '', 11),
	(61, 'Lamborghini', 'https://images.unsplash.com/photo-1567346495660-baf9ca9d661a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80', '', 11),
	(71, 'Ferrari', 'https://images.unsplash.com/photo-1527247043589-98e6ac08f56c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'It\'s red', 11),
	(81, 'Cute white bunny', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'This bunny is not in the box', 11),
	(91, 'Cute yellow bunny', 'https://images.unsplash.com/photo-1564650211163-21049f1b683a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80', '', 11);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;

-- Dumpar struktur för tabell heroku_3c1312c6bf327d5.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumpar data för tabell heroku_3c1312c6bf327d5.users: ~2 rows (ungefär)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
	(1, 'tom@bombadil.com', '$2b$10$faRS5o51oAB/pXYChrYW8uioG98JKiIaj16rQaEPdeTnSXeC6MjU2', 'Tom', 'Bombadil'),
	(11, 'nicolas@cage.com', '$2b$10$cxp2cUqs1.f4trlc/a/hJOm5dGObcBHgEH0MDF7lRK0qcS258r1L6', 'Nicolas', 'Cage');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
