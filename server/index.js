import express from "express";
import mongoose from "mongoose";
import cors from "cors";



const app = express();
const port = 3000;

app.use(cors());

mongoose.connect('mongodb+srv://naveenpandianp2:Naveen%4029@cluster0.bul8bxu.mongodb.net/portfolio_data?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDb Atlas');
})
.catch((error)=>{
    console.log('Error connection : ',error);
}); 

const userSchema = new mongoose.Schema(
{
    user : {}
}
);

const User = mongoose.model('user',userSchema);


//Routes
app.get('/',(req,res)=>{
    res.send('Hello MongoDB Atlas! and vercel!');
})
app.get('/api/portfolio_data',async(req,res)=>{
    const users = await User.find();
    res.json(users);
})

//Start the server
app.listen(port,()=>{
    console.log('Server is running on port ${port}');
});