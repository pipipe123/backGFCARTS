import { Router } from "express";
import { addUser, login, logout, addEscuelaToUser, getEscuelaByUser } from "../controllers/auth.controller.js";


// Ruta para obtener la escuela de un usuario


const router=Router();
router.post('/getEscuelaByUser', getEscuelaByUser);

router.post('/usuarios', addUser);

router.post('/usuarios/login', login);


router.post('/usuarios/logout', logout);

router.post('/add-escuela', addEscuelaToUser);

export default router;
