
import express from "express";
import dotenv from "dotenv";
import producer from "./producerroutes.js";
import bodyParser  from"body-parser";


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/offer", producer);


const PORT = 8000;


app.listen(
PORT,
console.log(`server running in on port ${PORT}`)
);