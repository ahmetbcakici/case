CREATE DATABASE `Shorter` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_turkish_ci */;

CREATE TABLE `conversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deeplink` varchar(300) COLLATE utf8_turkish_ci NOT NULL,
  `weburl` varchar(300) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1571 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_code` varchar(10) NOT NULL,
  `conversionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_code_UNIQUE` (`short_code`),
  KEY `conversionId` (`conversionId`),
  CONSTRAINT `links_ibfk_1` FOREIGN KEY (`conversionId`) REFERENCES `conversions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;

CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `added_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

