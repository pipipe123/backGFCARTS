import app from "./app.js"
import { connectDB } from "./db.js"
import iniciarGeneracionCompetidores from "./controllers/scripts.js"

connectDB()
app.listen(3000)
console.log("UP on port ", 3000)




