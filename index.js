const http = require("http");
const express = require("express");
const {Server} = require("socket.io");
const {join} = require("node:path");
const bodyParser = require("body-parser");


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.set("views",join(__dirname,"public/views"));
app.use(express.static(join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"public/views/index.html"));
});

io.on("connection",(socket)=>{
    socket.on("chat-message",(msg)=>{
        io.emit("recv-message",msg);
    });
    socket.on("recv-message",(msg)=>{
        console.log(msg.msg);
        
    })
});

server.listen(port,()=>{
    console.log("Server is running!");
})
