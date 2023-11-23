-- Author jreyes
-- SP's para libros

-- CREAR LIBRO
DELIMITER //
CREATE PROCEDURE createLibro (
	IN title VARCHAR(30),
    IN relaseDate DATE,
    IN price FLOAT,
    IN autID INT
)
BEGIN
	DECLARE secureTitle VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureTitle = REPLACE(title, "'", "''");
    
    INSERT INTO libros (
		title,
        relaseDate,
        price,
        autID
    )
    VALUES (
		secureTitle,
        relaseDate,
        price,
        autID
    );
END //

-- BORRAR LIBROS
DELIMITER //
CREATE PROCEDURE deleteLibro (
	IN title VARCHAR(30),
    IN firstName VARCHAR(30),
    IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName, secureTitle VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    SET secureTitle = REPLACE(title, "'", "''");
    
    DELETE FROM libros AS l 
	WHERE l.autID = (
		SELECT a.autID FROM autores AS a
        JOIN libros AS l ON a.autID = l.autID
        WHERE a.firstName = secureName AND a.lastName = secureLastName);
END //

-- BUSCAR LIBROS
DELIMITER //
CREATE PROCEDURE findLibro (
	IN title VARCHAR(30)
)
BEGIN
	DECLARE secureTitle VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureTitle = REPLACE(title, "'", "''");
    
    SELECT l.IDLibro, l.title, l.price, l.relaseDate, a.firstName, a.lastName FROM libros AS l
    JOIN autores AS a ON l.autID = a.autID
	WHERE l.title = secureTitle;
END //


-- BUSCAR POR AUTOR
DELIMITER //
CREATE PROCEDURE findLibroByAuthor (
	IN firstName VARCHAR(30),
	IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    
    SELECT l.IDLibro, l.title, l.price, l.relaseDate, a.firstName, a.lastName FROM libros AS l
    JOIN autores AS a ON l.autID = a.autID
	WHERE a.firstName = secureName AND a.lastName = secureLastName;
END //