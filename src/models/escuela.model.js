import moongose from "mongoose"
const escuelaSchema = new moongose.Schema({
    nombre:{
        type: String,
        require: true
    },
    codigo:{
        type: String,
        require:true
    },
})


export default moongose.model('Escuela', escuelaSchema)