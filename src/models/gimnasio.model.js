import moongose from "mongoose"
const gimnasioSchema = new moongose.Schema({
    nombre:{
        type: String,
        require: true
    },
    escuela:{
        type: String,
        require:true
    },
    entrenador:{
        type: String,
        require: true
    },
})


export default moongose.model('Gimnasio', gimnasioSchema)