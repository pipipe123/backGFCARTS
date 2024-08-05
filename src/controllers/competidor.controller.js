import Competidor from "../models/competidor.model.js";
import Gimnasio from "../models/gimnasio.model.js";
import Escuela from "../models/escuela.model.js";

// Mapeo de grados a números
const beltToGupMap = {
    "Cinturón Blanco": 10,
    "Cinturón Blanco - Avanzado": 9,
    "Cinturón Amarillo": 8,
    "Cinturón Amarillo - Avanzado": 7,
    "Cinturón Verde": 6,
    "Cinturón Verde - Avanzado": 5,
    "Cinturón Azul": 4,
    "Cinturón Azul - Avanzado": 3,
    "Cinturón Rojo": 2,
    "Cinturón Rojo - Avanzado": 1,
    "Cinturón Negro": 0
};

// Crear un nuevo competidor
export const createCompetidor = async (req, res) => {
    const {
        nombre,
        cinta,
        sexo,
        estatura, // en metros
        anioNacimiento,
        peso, // en kg
        modalidad,
        gimnasio,
        escuela,
        torneo
    } = req.body;

    try {
        // Validar si el gimnasio existe
        const gimnasioExistente = await Gimnasio.findOne({ nombre: gimnasio });
        if (!gimnasioExistente) {
            return res.status(404).send('Gimnasio no encontrado');
        }
        const entrenador = gimnasioExistente.entrenador;

        // Validar si la escuela existe
        const escuelaExistente = await Escuela.findOne({ nombre: escuela });
        if (!escuelaExistente) {
            return res.status(404).send('Escuela no encontrada');
        }

        // Calcular la categoría basada en el año de nacimiento
        const edad = new Date().getFullYear() - anioNacimiento;
        let categoria;

        switch (true) {
            case (edad >= 9 && edad <= 11):
                categoria = 'Infantil';
                break;
            case (edad >= 12 && edad <= 14):
                categoria = 'Cadetes';
                break;
            case (edad >= 15 && edad <= 17):
                categoria = 'Junior';
                break;
            case (edad >= 18 && edad <= 30):
                categoria = 'Senior 1';
                break;
            case (edad >= 31 && edad <= 40):
                categoria = 'Senior 2';
                break;
            default:
                return res.status(400).send(`Edad fuera de rango para categorías definidas ${nombre}`);
        }

        // Traducir el grado al número correspondiente
        const gradoNumero = beltToGupMap[cinta];
        if (gradoNumero === undefined) {
            return res.status(400).send('Grado de cinturón inválido');
        }

        // Calcular el IMC

        const estaturaEnM= estatura /100
        const imc = peso / (estaturaEnM * estaturaEnM);

        const newCompetidor = new Competidor({
            nombre,
            cinta,
            grado: gradoNumero, // Guardar el grado como número
            anioNacimiento,
            edad,
            peso,
            sexo,
            estatura,
            modalidad,
            entrenador,
            gimnasio,
            escuela,
            categoria,
            torneo:"N/A",
            imc // Añadimos el IMC al modelo
        });

        const saveCompetidor = await newCompetidor.save();
        const rback = await Competidor.find();
        res.status(201).send(rback);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el competidor');
    }
};
export const getCompetidoresCountByEscuela = async (req, res) => {
    const { escuela } = req.params;

    try {
        const count = await Competidor.countDocuments({ escuela });
        res.status(200).json({ count });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la cantidad de competidores');
    }
};
// Leer todos los competidores
export const readCompetidor = async (req, res) => {
    try {
        const competidores = await Competidor.find();
        res.status(200).send(competidores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al leer los competidores');
    }
};

// Buscar un competidor por nombre
export const readCompetidorxNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const competidor = await Competidor.findOne({ nombre });
        if (!competidor) {
            return res.status(404).send('Competidor no encontrado');
        }
        res.status(200).send(competidor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar el competidor');
    }
};

// Actualizar un competidor
export const updateCompetidor = async (req, res) => {
    const { nombre } = req.body;
    const {
        grado,
        anioNacimiento,
        peso,
        estatura,
        modalidad,
        entrenador,
        gimnasio
    } = req.body;
    try {
        const updatedCompetidor = await Competidor.findOneAndUpdate(
            { nombre: nombre }, // Asumiendo que "nombre" es un identificador único
            { grado, anioNacimiento, peso, modalidad, entrenador, gimnasio, estatura },
            { new: true }
        );
        if (!updatedCompetidor) {
            return res.status(404).send('Competidor no encontrado');
        }
        const competidores = await Competidor.find();
        res.status(200).send(competidores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el competidor');
    }
};

// Eliminar un competidor
export const deleteCompetidor = async (req, res) => {
    const { nombre } = req.body;
    try {
        const deletedCompetidor = await Competidor.findOneAndDelete({ nombre: nombre });
        if (!deletedCompetidor) {
            return res.status(404).send('Competidor no encontrado');
        }
        const competidores = await Competidor.find();
        res.status(200).send(competidores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el competidor');
    }
};

// Obtener competidores por gimnasio
export const readCompetidoresByGimnasio = async (req, res) => {
    const { gimnasio } = req.params;
    try {
        console.log(gimnasio)
        const competidores = await Competidor.find({ gimnasio });
        if (!competidores.length) {
            return res.status(404).send('No se encontraron competidores para este gimnasio');
        }
        res.status(200).send(competidores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar competidores por gimnasio');
    }
};


export const getCinturonesNegrosCountByEscuela = async (req, res) => {
    const { escuela } = req.params;

    try {
        const count = await Competidor.countDocuments({ escuela, grado: 0 });
        res.status(200).json({ count });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la cantidad de cinturones negros');
    }
};

// Actualizar el torneo de un competidor
export const updateCompetidorTorneo = async (req, res) => {
    const { nombre, torneo } = req.body; // Obtener nombre y torneo del cuerpo de la solicitud

    try {
        console.log('Actualizando competidor con nombre:', nombre); // Log para verificar el nombre
        console.log('Nuevo torneo:', torneo); // Log para verificar el torneo

        // Encontrar y actualizar el competidor por nombre
        const updatedCompetidor = await Competidor.findOneAndUpdate(
            { nombre: nombre }, // Buscar por nombre
            { torneo: torneo }, // Actualizar el campo torneo
            { new: true } // Devolver el documento actualizado
        );

        if (!updatedCompetidor) {
            console.log('Competidor no encontrado');
            return res.status(404).send('Competidor no encontrado');
        }

        console.log('Competidor actualizado:', updatedCompetidor); // Log para verificar el documento actualizado
        // Devolver solo el competidor modificado
        res.status(200).json(updatedCompetidor);
    } catch (error) {
        console.log('Error al actualizar el torneo del competidor:', error); // Log para errores
        res.status(500).send('Error al actualizar el torneo del competidor');
    }
};


// Obtener nombres de competidores por torneo
export const readCompetidoresByTorneo = async (req, res) => {
    const { torneo } = req.params; // Obtener el torneo desde los parámetros de la URL

    try {
        const competidores = await Competidor.find({ torneo }, 'nombre'); // Solo seleccionar el campo "nombre"
        if (!competidores.length) {
            return res.status(404).send([]);
        }
        res.status(200).send(competidores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar competidores por torneo');
    }
};
