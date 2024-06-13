import express from "express";
import bodyParser from 'body-parser'
import connectDB from './SRC/DB/database.js'
import cors from 'cors'
import dotenv from "dotenv";
import router from "./SRC/route/indexroute.js";
import  commentRoutes  from "./SRC/route/commentRoute.js";
import commentSchema from "./SRC/models/commentModel.js";

//INITIALIZING THE DOTENV METHOD
dotenv.config();

//ASIGNING THE EXPRESS METHOD TO A VARIABLE
const app = express();

// Calling the port from the env file
const PORT  = process.env.PORT || 3030


// Using the express functions
app.use(express.json());

// app.use('/comments', commentRoutes);

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/homezone', router)

const startServer  = async () => {

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