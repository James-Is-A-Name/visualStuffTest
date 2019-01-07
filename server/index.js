const express = require("express")
const server = express()
//const routes = require("routes/index")

const port = process.env.PORT || 3000;

server.use(express.json())
server.use(express.static(__dirname+"/../public"))
//server.use("/routes",routes)


server.listen(port,function(){

    speak(`The server has started on port ${port}`)
})


function speak(message){
    
    const err = new Error().stack

    console.log(err.split("\n")[2])
    
    console.log(message)
}