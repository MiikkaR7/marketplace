CREATE TABLE IF NOT EXISTS `listings` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `price` float NOT NULL,
    `description` varchar(200) NOT NULL,
    `image` varchar(250) NOT NULL,
    `owner` varchar(60) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO `menuitems` (`name`, `price`, `description`, `image`) VALUES (
  'Muumimuki', 
  '30.99', 
  'Harvinainen keräilyesine', 
  'https://finmug.fi/cdn/shop/files/Muumimukipiisamirottaluolassa1.webp?v=1707208560'
  );
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `hashed_password` VARCHAR(60) NOT NULL,
  `admin` BOOLEAN NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;