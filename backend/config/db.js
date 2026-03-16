const mongoose=require("mongoose");

const connectDB = async () =>{
    try {
        const MongoDB_URI=process.env.MONGO_URI;
        await mongoose.connect(MongoDB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error");
        process.exit(1);
    }
}
module.exports=connectDB;