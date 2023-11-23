const sqlConnect = require('./mysqlUtils');
var express = require('express');
const jwt = require('jsonwebtoken');
var app = express();
//nos ayudara a crear el token con el usuario
const secreto = require('./constants');
//Esta instruccion nos ayudara a leer los payload
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ruta para login, recibe del payload de usuario, tambien generamos el token aqui mismo
// y es regresado.
app.post('/login', (req, res) => {
    const user = {
        id: id,
        username: username,
        email: email
    } = req.body;

    jwt.sign({user}, secreto.secreto, (error, token) =>{
        res.json({
            token
        });
    });
});

//este metodo nos ayuda a verificar el token generado en el login, el cual se extrae del header de autorization
// si el token esta bien entonces avanzaremos a la siguiente instruccion si no nos arrojara un error 403
function verifyToken(req, res, next){
    const baerHeader = req.headers['authorization'];

    if (typeof baerHeader !== 'undefined'){
        const bearertoken = baerHeader.split(' ')[1];
        req.token = baerHeader;
        next();
    } else {
        res.sendStatus(403);
    }
}

//ruta de home
app.get('/', (req, res) => {
    res.send("¡Hola! Esta es la página de inicio.");
});

//ruta para about
app.get('/about', (req, res) => {
    res.send("Bienvenido a la página 'Acerca de nosotros'.");
});

//ruta para contact
app.get('/contact', (req,res) => {
    res.send("Ponte en contacto con nosotros en contact@example.com.");
});

//ruta para agregar autores, valida el token y si es valido entonces hace los pasos para guardar los datos
app.post('/autores/add', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {firstName, lastName} = req.body;
            res.send(sqlConnect.addAutor(firstName, lastName));
        }
    });
});

//ruta para encontrar autores, valida el token y si es valido entonces hace los pasos para encontrar los datos
app.get('/autores/find',verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {firstName, lastName} = req.body;
            res.send(sqlConnect.findAutor(firstName, lastName));
        }
    });
});

//ruta para borrar autores, valida el token y si es valido entonces hace los pasos para borrar los datos
app.delete('/autores/delete', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {firstName, lastName} = req.body;
            res.send(sqlConnect.deleteAutor(firstName, lastName));
        }
    });
});

//ruta para contar los libros por autor, valida el token y si es valido entonces hace los pasos para contar los datos
app.get('/autores/countLibrosDeAutores', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {firstName, lastName} = req.body;
            res.send(sqlConnect.countLibrosDeAutores(firstName, lastName));
        }
    });
});

//ruta para agregar libros, valida el token y si es valido entonces hace los pasos para guardar los datos
app.post('/libros/add', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {title, releaseDate, price, autID} = req.body;
            res.send(sqlConnect.addLibros(title, releaseDate, price, autID));
        }
    });
});

//ruta para encontrar libros, valida el token y si es valido entonces hace los pasos para buscar los datos
app.get('/libros/find', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {title} = req.body;
            res.send(sqlConnect.findLibro(title));
        }
    });
});

//ruta para eliminar libros, valida el token y si es valido entonces hace los pasos para eliminar los datos
app.delete('/libros/delete', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {title, firstName, lastName} = req.body;
            res.send(sqlConnect.deleteAutor(title, firstName, lastName));
        }
    });
});

//ruta para buscar los libros por autor, valida el token y si es valido entonces hace los pasos para buscar los datos
app.get('/libros/findByAuthor', verifyToken, (req, res) => {
    jwt.verify(req.token, secreto.secreto, (error, auth) => {
        if(error){
            res.sendStatus(403);
        } else {
            const {firstName, lastName} = req.body;
            res.send(sqlConnect.findLibroByAuthor(firstName, lastName));
        }
    });
});

app.listen(4053, function(){
    console.log("Connection successfully");
});