import mongoose from "mongoose";

const competidorSchema = new mongoose.Schema({
    nombre:{
        type: String
    },
    totalAreas: {
        type: Number,
        // required: true
    },
    cantidadCompetidores: {
        type: Number,
        // required: true
    },
    cantidadJueces: {
        type: Number,
        // required: true
    },
    codigo: {
        type: String,
        required: true
    },
    combate: {
        type: Object,
        // required: true
    },
    formas: {
        type: Object,
        // required: true
    }, 
    usuario:{
        type: String
    },
    graficados:{
        type: Array
    }
});

export default mongoose.model('Evento', competidorSchema);
