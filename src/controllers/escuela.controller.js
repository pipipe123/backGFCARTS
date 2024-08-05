import Escuela from "../models/escuela.model.js";

// Crear una nueva escuela
export const createEscuela = async (req, res) => {
    const { nombre, codigo } = req.body;
    try {
        const newEscuela = new Escuela({ nombre, codigo });
        const saveEscuela = await newEscuela.save();
        res.status(201).send(saveEscuela);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear la escuela');
    }
};

// Obtener todas las escuelas
export const readEscuela = async (req, res) => {
    try {
        const escuelas = await Escuela.find();
        res.status(200).send(escuelas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener las escuelas');
    }
};

// Obtener una escuela por nombre
export const readEscuelaxNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const escuela = await Escuela.findOne({ nombre });
        if (!escuela) {
            return res.status(404).send('Escuela no encontrada');
        }
        res.status(200).send(escuela);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener la escuela');
    }
};

// Actualizar una escuela por nombre
export const updateEscuela = async (req, res) => {
    const { nombre } = req.params;
    const { nuevoNombre, gimnasios, codigo } = req.body;
    try {
        const updatedEscuela = await Escuela.findOneAndUpdate(
            { nombre },
            { nombre: nuevoNombre, gimnasios, codigo },
            { new: true }
        );
        if (!updatedEscuela) {
            return res.status(404).send('Escuela no encontrada');
        }
        res.status(200).send(updatedEscuela);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar la escuela');
    }
};

// Eliminar una escuela por nombre
export const deleteEscuela = async (req, res) => {
    const { nombre } = req.body;
    try {
        const deletedEscuela = await Escuela.findOneAndDelete({ nombre });
        if (!deletedEscuela) {
            return res.status(404).send('Escuela no encontrada');
        }
        res.status(200).send('Escuela eliminada');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar la escuela');
    }
};


