const express = require('express');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use( express.json());

const todoRoutes = require('./routes/todos');

app.use("/api/v1",todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server Started at Port no. at ${PORT}`);
});

const dbconnect = require('./config/database');
const { Portal } = require('@material-ui/core');
dbconnect();    


app.get("/",(req,res) => {
    res.send(`<h1>This is HomePage</h1>`);
})
