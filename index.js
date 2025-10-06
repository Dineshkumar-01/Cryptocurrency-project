import express from "express"; 
import axios from "axios"; //import express and axios to use express and to get data from api
import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


const port =3000; //declared port number
const app=express(); //call function for express is stored in this variable
const file=fileURLToPath(import.meta.url);
const dir=path.dirname(file);

app.use(express.static("public")); //This line used to use static files

app.set("view engine","ejs");
app.set("views",path.join(dir,"views"))

app.get("/",(req,res)=>{
    res.render("index",{coinData:0});
});
app.get("/about",async(req,res)=>{
    const request=await axios.get(`https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`);//Api key must be add here or create in .env file as COINGECKO_API_KEY
    const result=JSON.stringify(request.data);
    res.render("about",{content : result});
})
app.get("/search",async(req,res)=>{
    const coin=req.query.coin;
    try{
        const response=await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`);//Api key must be add here or create in .env file as COINGECKO_API_KEY
        res.render("index",{coinData:response.data});
    }catch(error){
        console.error("Error fetching coin data:", error.message);
        res.render("index",{coinData:null});
    }
})
app.get("/coins",async(req,res)=>{
    const request=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`);//Api key must be add here or create in .env file as COINGECKO_API_KEY
    const result=JSON.stringify(request.data);
    res.render("about",{content : result});
})
app.listen(port,()=>{
    console.log(`sever listing in port ${port}`); //log msg in console
}); //function to listen in port server 
