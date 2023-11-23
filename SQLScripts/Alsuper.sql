-- Author jreyes
-- script para creacion de DB

CREATE DATABASE testAlsuper;
USE testAlsuper;

CREATE TABLE autores (
	autID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    PRIMARY KEY(autID)
);


CREATE TABLE libros (
	IDLibro INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    relaseDate DATE NOT NULL,
    price FLOAT NOT NULL,
    autID INT NOT NULL,
    PRIMARY KEY(IDLibro),
    FOREIGN KEY(autID) REFERENCES autores(autID)
);

