    import moongose from "mongoose"
const usuarioSchema = new moongose.Schema({
    usuario:{
        type: String,
        require: true
    },

    correo:{
        type: String,
        require: true
    },
    pass:{
        type: String,
        require: true
    },
    escuela:{
        type: String,
        require:true
    },
})


export default moongose.model('Usuario', usuarioSchema)