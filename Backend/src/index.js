import express from 'express';
import "dotenv/config"
import authRotes from "./routes/authRotes.js"
import bookRoutes from "./routes/bookRoutes.js"
import {connectDB} from "./lib/db.js"

const app = express();
app.use(express.json())
const port = process.env.PORT


app.use("/api/auth", authRotes);
app.use("/api/book", bookRoutes);





// console.log(authRotes);


app.get("/", (req,res)=>{
    res.send("hi")
})
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    connectDB()
})
