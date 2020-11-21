const express = require('express');
var cors = require('cors')
const { bdConnection } = require('./database/config')
require('dotenv').config();

// Crea servidor de express
const app = express();

// Base de datos
bdConnection();

// CORS
app.use( cors() )

// parse application/json
app.use( express.json())


// Directorio Publico
app.use( express.static('public') );

// Rutas
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/event', require('./routes/events') )

// Escucha peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en ${ process.env.PORT }`);
})

