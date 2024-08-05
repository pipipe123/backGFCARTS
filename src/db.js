import mongoose from "mongoose";


export const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://localhost/graficas')
        console.log('>>>>> Conectado')
        
    } catch (error) {
        console.log(error)     
    }
}
