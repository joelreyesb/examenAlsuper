const constants = require('./constants')
const mysql = require('mysql');

//Se Crea la conexion a la BD
const connection = mysql.createConnection({
    host: constants.host,
    database: constants.DB,
    user: constants.userName,
    password: constants.password
});

//Funcion para llamar sp's relacionados al usuario
function CRUDAuthor(firstName, lastName, acction){
    const query = 'CALL ' + acction + ' ("' + firstName + '", "' + lastName + '")';
    console.log(query);
    connection.query(query, (error, res) => {
        if (error){
            console.log(error);
            return error;
        }
        else {
            console.log(res);
            return res;
        }
    });
}

//Funcion para llamar el sp para agregar libro
function addLibros(title, releaseDate, price, autID){
    const query = 'CALL ' + constants.addLibro + ' ("' + title + '", "' + releaseDate + '", "' + price + '", "' + autID + '")';
    console.log(query);
    connection.query(query, (error, res) => {
        if (error){
            console.log(error);
               return;
        }
        else {
            console.log(res);
        }
    });
}

//Funcion para eliminar un libro
function deleteLibros(title, firstName, lastName){
    const query = 'CALL ' + constants.deleteLibro + ' ("' + title + '", "' + firstName + '", "' + lastName + '")';
    console.log(query);
    connection.query(query, (error, res) => {
        if (error){
            console.log(error);
               return;
        }
        else {
            console.log(res);
        }
    });
}

//Funcion para encontrar un libro
function findLibros(title){
    const query = 'CALL ' + constants.findLibro + ' ("' + title + '")';
    console.log(query);
    connection.query(query, (error, res) => {
        if (error){
            console.log(error);
               return;
        }
        else {
            console.log(res);
        }
    });
}

//El modulo export nos permitira hacer llamadas a estos metodos desde fuera
//Asi se puede mantener la informacion un poco encapsulada
module.exports = {
    
    addAutor: function(firstName, lastName){
        CRUDAuthor(firstName, lastName, constants.addAutor);
    },
    
    deleteAutor:  function(firstName, lastName){
        CRUDAuthor(firstName, lastName, constants.deleteAutor);
    },

    findAutor: async function(firstName, lastName){
        CRUDAuthor(firstName, lastName, constants.findAutor)
    },

    countLibrosDeAutores: function(firstName, lastName){
        CRUDAuthor(firstName, lastName, constants.countLibrosDeAutores);
    },

    addLibros: function(title, releaseDate, price, autID){
        addLibros(title, releaseDate, price, autID);
    },

    deleteLibros: function (title, firstName, lastName){
        deleteLibros(title, firstName, lastName);
    },

    findLibro: function (title){
        findLibros(title);
    },

    findLibroByAuthor: function (firstName, lastName){
        CRUDAuthor(firstName, lastName, constants.findLibroByAuthor);
    }
};