import moongose from "mongoose"
const competidorSchema = new moongose.Schema({
    nombre:{
        type: String,
        require: true
    },
    grado:{
        type: String,
        require: true
    },
    cinta:{
        type:String,
        require: true
    },
    sexo:{
        type: String,
        require: true
    },
    estatura:{
        type: Number,
        require: true
    },
    imc:{
        type: Number,
        require:true
    },
    anioNacimiento:{
        type: Number,
        require: true
    },
    edad:{
        type:Number
    },  
    categoria:{
        type: String,
        require: true
    },
    peso:{
        type: Number,
        require: true
    },
    modalidad:{
        type: String,
        require: true
    },
    entrenador:{
        type: String,
        // require: true
    },
    escuela:{
        type: String,
        // require: true
    },
    gimnasio:{
        type: String,
        // require: true
    },
    torneo:{
        type: String
    },
    
    
    
})


export default moongose.model('Competidor', competidorSchema)