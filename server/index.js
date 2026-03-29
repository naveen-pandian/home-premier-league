import express from "express";
import mongoose from "mongoose";
import cors from "cors";



const app = express();
const port = 3000;

app.use(cors());

mongoose.connect('mongodb+srv://naveenpandianp2:Naveen%4029@cluster0.bul8bxu.mongodb.net/game_data?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDb Atlas');
})
.catch((error)=>{
    console.log('Error connection : ',error);
}); 

const hplSchema = new mongoose.Schema(
{
    hpl : {}
}
);

const hpl_data = mongoose.model('home_premier_league',hplSchema);


//Routes
app.get('/',(req,res)=>{
    res.send('Hello MongoDB Atlas! and vercel! ');
})
app.get('/api/hpl_data',async(req,res)=>{
    const hpl = await hpl_data.find();
    res.json(hpl);
})

//Start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
