const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// DB Connection
const conn = require("./db/conn");

conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes)

app.listen(3000, '0.0.0.0', function(){
    console.log("servidor Online!!")
   
});

// senha cabralclarinetista WlUsgTDDTeZuus8W 