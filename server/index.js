const express = require("express")
const server = express()
//const routes = require("routes/index")

const port = process.env.PORT || 3000;

server.use(express.json())
server.use(express.static(__dirname+"/../public"))
//server.use("/routes",routes)


server.listen(port,function(){
    console.log("The server has started on port ",port)
})