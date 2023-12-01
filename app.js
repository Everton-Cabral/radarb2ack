const express = require("express")
const cors = require("cors")
const app = express()
const AWS = require('aws-sdk');

app.use(cors())

app.use(express.json())


// Configuração do SDK da AWS
AWS.config.update({
    accessKeyId: 'AKIA2CCQOYPG4V67BYF6',
    secretAccessKey: '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',
    region: 'sa-east-1',
  });
  
  const s3 = new AWS.S3();
  app.set('s3', s3);  
  
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