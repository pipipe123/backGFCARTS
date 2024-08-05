import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import session from 'express-session';
import services from './routes/services.routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:8081",
credentials: true // Habilitar el envío de credenciales
}))

app.use(morgan('dev'))
app.use(express.json())

app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // En producción, asegúrate de configurar esto correctamente
}));


app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  

app.use('/api',services)
app.use('/auth',authRoutes)
// app.use('/api',taskRoutes)
  



export default app