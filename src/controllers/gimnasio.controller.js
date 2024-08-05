import Gimnasio from "../models/gimnasio.model.js";
import Escuela from "../models/escuela.model.js";
export const getGimnasiosCountByEscuela = async (req, res) => {
    const { escuela } = req.params;

    try {
        const count = await Gimnasio.countDocuments({ escuela });
        res.status(200).json({ count });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la cantidad de gimnasios');
    }
};
// Crear un nuevo gimnasio
export const createGimnasio = async (req, res) => {
    const { nombre, escuela, entrenador } = req.body;

    try {
        // Validar si la escuela existe
        const escuelaExistente = await Escuela.findOne({ nombre: escuela });
        if (!escuelaExistente) {
            return res.status(404).send('Escuela no encontrada');
        }

        const newGimnasio = new Gimnasio({
            nombre,
            escuela,
            entrenador
        });
        const saveGimnasio = await newGimnasio.save();
        const gimnasios = await Gimnasio.find();
        res.status(201).send(gimnasios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el gimnasio');
    }
};

// Obtener todos los gimnasios
export const readGimnasio = async (req, res) => {
    try {
        const gimnasios = await Gimnasio.find();
        res.status(200).send(gimnasios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al leer los gimnasios');
    }
};

// Obtener un gimnasio por nombre
export const readGimnasioxNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const gimnasio = await Gimnasio.findOne({ nombre });
        if (!gimnasio) {
            return res.status(404).send('Gimnasio no encontrado');
        }
        res.status(200).send(gimnasio);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar el gimnasio');
    }
};

// Obtener gimnasios por escuela
export const readGimnasioxEscuela = async (req, res) => {
    const { escuela } = req.params;
    try {
        console.log(escuela)
        const gimnasios = await Gimnasio.find({ escuela });
        if (!gimnasios || gimnasios.length === 0) {
            return res.status(404).send('No se encontraron gimnasios para esta escuela');
        }
        res.status(200).send(gimnasios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar gimnasios por escuela');
    }
};

// Actualizar un gimnasio por nombre
export const updateGimnasio = async (req, res) => {
    const { nombre } = req.params;
    const { escuela, entrenador } = req.body;

    try {
        const updatedGimnasio = await Gimnasio.findOneAndUpdate(
            { nombre },
            { escuela, entrenador },
            { new: true }
        );

        if (!updatedGimnasio) {
            return res.status(404).send('Gimnasio no encontrado');
        }

        const gimnasios = await Gimnasio.find();
        res.status(200).send(gimnasios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el gimnasio');
    }
};

// Eliminar un gimnasio por nombre
export const deleteGimnasio = async (req, res) => {
    const { nombre } = req.body;

    try {
        const deletedGimnasio = await Gimnasio.findOneAndDelete({ nombre });

        if (!deletedGimnasio) {
            return res.status(404).send('Gimnasio no encontrado');
        }

        const gimnasios = await Gimnasio.find();
        res.status(200).send(gimnasios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el gimnasio');
    }
};
