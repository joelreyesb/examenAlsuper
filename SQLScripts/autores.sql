-- Author jreyes
-- SP's para autores

-- CREAR AUTOR
DELIMITER //
CREATE PROCEDURE createAutor (
	IN firstName VARCHAR(30),
    IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    
    INSERT INTO autores (
		firstName,
        lastName
    )
    VALUES (
		secureName,
        secureLastName
    );
END //

-- BORRAR AUTOR
DELIMITER //
CREATE PROCEDURE deleteAutor (
	IN firstName VARCHAR(30),
    IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    
    DELETE FROM autores AS a
	WHERE a.firstName = secureName AND a.lastName = secureLastName;
END //

-- BUSCAR AUTOR
DELIMITER //
CREATE PROCEDURE findAutor (
	IN firstName VARCHAR(30),
    IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    
    SELECT a.autID, a.firstName, a.lastName FROM autores AS a
	WHERE a.firstName = secureName AND a.lastName = secureLastName;
END //

DELIMITER //
CREATE PROCEDURE countLibrosDeAutores (
	IN firstName VARCHAR(30),
    IN lastName VARCHAR(30)
)
BEGIN
	DECLARE secureName, secureLastName VARCHAR(30);
    
    -- Este parametro nos previene de un sql injection convirtiendo los comandos en cadenas
    SET secureName = REPLACE(firstName, "'", "''");
    SET secureLastName = REPLACE(lastName, "'", "''");
    
    SELECT COUNT(l.IDLibro) Numero_De_Libros, a.firstName, a.lastName FROM autores AS a
    JOIN libros AS l ON a.autID = l.autID
	WHERE a.firstName = secureName AND a.lastName = secureLastName
    GROUP BY a.autID;
END //