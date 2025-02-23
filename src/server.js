import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routers/auth_routers.js'
import speaker from './routers/speaker_routes.js'
import auditorium from './routers/auditorium_routers.js'
import booking from './routers/booking_routes.js'


// Inicializaciones

const app = express();
dotenv.config();

// Configuraciones

app.set('port', process.env.PORT || 4000);
app.use(cors());

// Middlewares
app.use(express.json());


// Variables Globales

// Rutas

app.get('/',(req,res)=>{
    res.send('Server on 👨‍💻✅');
})

app.use('/api/',auth)
app.use('/api/',speaker)
app.use('/api/',auditorium)
app.use('/api/',booking)


//Rutas no encontradas

app.use((req,res)=>res.status(404).send("EndPoint no encontrado - 404 ❌"))

// Exportar la instancia de express por medio de app
export default  app;