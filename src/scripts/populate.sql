 CREATE TABLE `person` (
  `name` varchar(20) DEFAULT NULL,
  `seller` tinyint(1) DEFAULT NULL,
  `registration` date DEFAULT NULL,
  `comments` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1