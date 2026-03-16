const express=require('express');
const app=express();
const cors=require('cors');
//const { configDotenv } = require('dotenv');
const port=5000;
require("dotenv").config();

//Json Middleware
app.use(express.json());

//Cors MiddleWare
app.use(cors());

const connectDB=require("./config/db");
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port,()=>{
            console.log(`Server started on port ${port}`);
        })
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

app.get("/", (req,res)=>{
    res.send("App Running");
})

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

startServer();
