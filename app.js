const express=require("express");
const { Server } = require('socket.io');
const bodyParser=require("body-parser");
const cookieSession=require('cookie-session');
const { createServer } = require('node:http');
require('dotenv').config();

const app=express();
const server = createServer(app);
const io = new Server(server);
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'))
app.use(cookieSession({keys:['key1','key2']}));


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    }); 
});

app.get('/',(req,res)=>{
    res.render('chat');
})


app.use('/',(req,res,next)=>{
    res.status(404);
    res.send("pagenotfound");
})



server.listen(3000);