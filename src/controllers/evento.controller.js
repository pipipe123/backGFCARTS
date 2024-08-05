import Evento from "../models/evento.model.js";
import generarCodigoAleatorio from "./operaciones.js";

// Create Evento
export const createEvento = async (req, res) => {
    const {

        usuario,
        nombre
    } = req.body;
    try {
        const newEvento = new Evento({
            nombre,
            usuario,
            codigo: generarCodigoAleatorio()
        });
        const saveEvento = await newEvento.save();
        const rback = await Evento.find();
        res.status(201).send(rback);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el evento');
    }
};

// Read Evento
export const readEvento = async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.status(200).send(eventos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al leer los eventos');
    }
};

export const ReadEventoxCodigo = async (req, res) => {
    const { codigo } = req.params;
    console.log(codigo) // Obtener el código desde los parámetros de la URL
    try {
        const evento = await Evento.findOne({ codigo: codigo });
        if (!evento) {
            return res.status(404).send('Evento no encontrado');
        }
        res.status(200).send(evento);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar el evento');
    }
};
// Update Evento
export const updateEvento = async (req, res) => {
    const { codigo } = req.body;
    const {
        totalAreas,
        cantidadCompetidores,
        cantidadjueces
    } = req.body;
    try {
        const updatedEvento = await Evento.findOneAndUpdate(
            { codigo: codigo }, // Assuming "codigo" is a unique identifier
            { totalAreas, cantidadCompetidores, cantidadjueces },
            { new: true }
        );
        if (!updatedEvento) {
            return res.status(404).send('Evento no encontrado');
        }
        const eventos = await Evento.find();
        res.status(200).send(eventos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el evento');
    }
};

// Delete Evento
export const deleteEvento = async (req, res) => {
    const { codigo } = req.body;
    console.log(codigo)
    try {
        const deletedEvento = await Evento.findOneAndDelete({ codigo: codigo });
        if (!deletedEvento) {
            return res.status(404).send('Evento no encontrado');
        }
        const eventos = await Evento.find();
        res.status(200).send(eventos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el evento');
    }
};


export const readEventosByUsuario = async (req, res) => {
    const { usuario } = req.params;
    try {
        const eventos = await Evento.find({ usuario: usuario });
        if (!eventos || eventos.length === 0) {
            return res.status(404).send('No se encontraron eventos para este usuario');
        }
        res.status(200).send(eventos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar los eventos del usuario');
    }
};