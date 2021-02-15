SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES Batiste */;

--
-- Base de dades: `APAC3`
--
DROP DATABASE IF EXISTS Notes ;

CREATE DATABASE Notes;
USE Notes;
-- --------------------------------------------------------
--
-- Estructura de les taules 
CREATE TABLE `Professors`(
	`nomUsuari` varchar(25) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `nomComplet` varchar(255) NOT NULL,
    `id` int(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `Alumnes`(
	`nomUsuari` varchar(25) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `nomComplet` varchar(255) NOT NULL,
    `repetidor` boolean not null,
    `curs` varchar(5),
    
    `id` int(11) NOT NULL AUTO_INCREMENT,
    foreign key(curs) references Assignatures(curs),
	PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8; 
CREATE TABLE `Assignatures`(
	`nomCurt` varchar(255) NOT NULL,
    `nomComplet` varchar(255) NOT NULL,
    `hores` int(3) NOT NULL,
    `modul` varchar(5),
    `curs` varchar(5),
	`id` int(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8; 
CREATE TABLE `docencia` (
	`missatge` varchar(255),
  `idAssignatures` int(11) NOT NULL,
  `idAlumne` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  FOREIGN KEY (idAssignatures) REFERENCES Assignatures(id) on delete cascade,
  FOREIGN KEY (idAlumne) REFERENCES Alumnes(id) on delete cascade, 
    FOREIGN KEY (idProfesor) REFERENCES Professors(id) on delete cascade,
    UNIQUE (idAssignatures, idAlumne)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `Professors` (`nomUsuari`, `Password`, `nomComplet`) VALUES( 'jg','1234', 'Joan G'),('ferr','1234', 'Ferran'),('vespi','1234', 'Pau'),('bracet','5678', 'Fran');
INSERT INTO `Alumnes` (`nomUsuari`, `Password`,`nomComplet`,`repetidor`,`curs`) VALUES('toro','1234', 'Guillem',false,'2dam'),('jaff','1234', 'Javi'),('an','1234', 'Ana M'),('kirta','1234', 'kike poler');
INSERT INTO `Assignatures` (`nomCurt`, `nomComplet`,`hores`) VALUES('prg', 'Programacio', 120),('bd','Base de datos', 60),('ad','Acces a Dades', 120),('di', 'Disseny Interficies',60);
INSERT INTO `docencia` (`idAssignatures`, `idAlumne`,`idProfesor`) VALUES(1,1,1),(1,2,1),(4,1,4),(4,3,4);