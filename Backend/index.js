import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors";
//import userRoutes from "./routes/users.js"
//import commentRoutes from "./routes/comments.js"
import cookieparser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import discussionRoutes from "./routes/discussion.js";

const app = express();
dotenv.config()

const corsOptions = {
   origin: 'http://localhost:5173',  // Frontend URL
   credentials: true,  // Allow cookies and other credentials
  };
  
  app.use(cors(corsOptions));  // Use CORS middleware

const connect = () =>{
    mongoose.connect(process.env.MONGO_URI).then( () =>{
        console.log("Connected to MongoDB")
    }).catch(err => {
        throw err
    });
};

app.use(express.json());
app.use(cookieparser()); 

app.use("/api/auth", authRoutes);
app.use("/api/discussion", discussionRoutes);

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "somwthing went wrong";
    return res.status(status).json({
        success : false,
        status : status,
        message : message
    })
})

app.listen(8000,()=>{
    connect()
    console.log("server is running on port 8000")
})