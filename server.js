import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import connectDB from './SRC/DB/database.js'
import cors from 'cors'
import dotenv from "dotenv";
import router from "./SRC/route/indexroute.js";

//INITIALIZING THE DOTENV METHOD
dotenv.config();

//ASIGNING THE EXPRESS METHOD TO A VARIABLE
const app = express();

// mongoose.connect('mongodb://localhost:27017/RUN')
// .then(()=> console.log('connected to database'))

//CALLING THE PORT FROM THE ENV FILE
const PORT = process.env.PORT || 2345

// Using the express functions
app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/homezone', router)

// Creating the start server method
// const startServer  = async () => {
//    // Calling the port from the env file
//    const PORT  = process.env.PORT || 2525
//    connectDB()
//    try {
//       app.listen(PORT,() => {console.log(`HOME-APP IS RUNNING ON PORT: ${PORT}`);})
//    } catch (error) {
//       console.log(error);
//    }
// };

// startServer();

// app.get("/", (req,res) => {
//    res.send('API IS RUNNING')
// })

const startServer  = async () => {
   // Calling the port from the env file
   const PORT  = process.env.PORT || 3030
   connectDB()
   try {
      app.listen(PORT,() => {console.log(`APP IS RUNNING ON PORT: ${PORT}`);})
   } catch (error) {
      console.log(error);
   }
};

startServer();

app.get("/", (req,res) => {
   res.send('API IS RUNNING')
})