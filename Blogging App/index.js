const express = require('express');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

const blog = require('./routes/blog');

app.use("/api.v1",blog);
N
const connectWithDb = require('./config/database');
connectWithDb();

app.listen(PORT,()=>{
    console.log(`App is Started at port no. ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is HomePage</h1>`);
})