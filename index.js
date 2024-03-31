const express = require('express');
const app = express();
const http = require('http')
const expressServer = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(expressServer,{
    connectionStateRecovery: {}
})
var mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");




// Database connect
mongoose
    .connect(process.env.MONGOURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Database connected for socket");
    })
    .catch((error) => {
        console.log("Error connecting to database in socket");
    });

// io.on('connection', function(socket){
//     console.log("New user connected");

//     // // continuously send mesage from server to client side
//     // setInterval(() => {
//     //     let date = new Date();
//     //     let time = date.getTime()
//     //     socket.emit('myEvent',time)
//     // }, 5);


//     /// after 10 second message will send from server side
//     // setTimeout(() => {
//     //     socket.send("Hi this message coming from subhendu from server")

//     // }, 10000);


//     // // when user leave showing this message
//     // socket.on('disconnect', function(){
//     //     console.log("User Disconnected");
//     // })



//     //// now received message from client side to server side

//     socket.on('myEvent',(msg)=>{
//         console.log(msg);
//     })
// })


// /// Brodcasing

// io.on('connection', function(socket){
//     console.log("new user connected");
//     io.emit('MyBrodCast',"Hello every one")
// })

// broad casting specific path
let nmeSp1 = io.of('/buy')
nmeSp1.on('connection', function(socket){
    console.log("new user connected");
    nmeSp1.emit('MyBrodCast',"Hello every one Buyyers")
})


let nmeSp2 = io.of('/sell')
nmeSp2.on('connection', function (socket) {
    console.log("new user connected");
    nmeSp2.emit('MyBrodCast', "Hello every one sellers")
})



app.get('/', function(req,res){
    res.sendFile(__dirname +  "/index.html")
})


io.on('connection', (socket) => {
    const token = socket.handshake.headers.authorization;
    // console.log(socket.handshake.headers.authorization);
    // console.log("new user data is",token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    // const senderId = decoded.userDetails._id;
    // console.log("sender id is",senderId);
    console.log("socket id", socket.id);

    const senderName = decoded.fullName;
    console.log("sender name",senderName);

    socket.join(senderName)
    console.log(`User ${senderName} joined the room!`);
    io.to(senderName).emit("receivedName", `User ${senderName}, Welcome to the private room!` 
)

    socket.on("sendMessage", async ({ chatId, receiverId, messageType, message }) => {


        let chatObj = {
            chatId,
            senderName,
            receiverId,
            messageType,
            message,

        };
        if (messageType === "text") {
            io.to(receiverId).emit(
                "receivedMessage",
                `${JSON.stringify(chatObj)}`
            );
        }
    });
    // console.log("new user connected");
    // socket.on('chat message', (msg) => {
    //     io.emit('chat message', msg);
    // });
});

/*

io.on("connection", (socket) => {
    console.log("A user connected");

    const token = socket.handshake.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
            const senderId = decoded.userDetails._id;
            const senderName = decoded.userDetails.firstName;
            // console.log(`User ${senderName} connected`);
            socket.join(senderId);
            console.log(`User ${senderName} joined the room!`);
            io.to(senderId).emit(
                "receivedMessage",
                `User ${senderName}, Welcome to the private room!`
            );

            socket.on("sendMessage", async ({ chatId, receiverId, messageType, message }) => {


                let chatObj = {
                    chatId,
                    senderId,
                    receiverId,
                    messageType,
                    message,

                };
                if (messageType === "text") {
                    io.to(receiverId).emit(
                        "receivedMessage",
                        `${JSON.stringify(chatObj)}`
                    );
                } else if (messageType === "image") {
                    io.to(receiverId).emit(
                        "receivedMessage",
                        `${JSON.stringify(chatObj)}`
                    );
                } else if (messageType === "document") {
                    io.to(receiverId).emit(
                        "receivedMessage",
                        `${JSON.stringify(chatObj)}`
                    );
                } else if (messageType === "video") {
                    io.to(receiverId).emit(
                        "receivedMessage",
                        `${JSON.stringify(chatObj)}`
                    );
                } else if (messageType === "audio") {
                    io.to(receiverId).emit(
                        "receivedMessage",
                        `${JSON.stringify(chatObj)}`
                    );
                }

                let newChatId = chatId

                let checkChatList = await chatListModel.findOne({
                    senderId: new mongoose.Types.ObjectId(receiverId),
                    receiverId: new mongoose.Types.ObjectId(senderId)
                })

                if (!chatId) {
                    if (checkChatList) {
                        newChatId = checkChatList.chatId
                    } else {
                        let chatId = v4();
                        let chatListData = [
                            {
                                senderId: new mongoose.Types.ObjectId(senderId),
                                receiverId: new mongoose.Types.ObjectId(receiverId),
                                chatId,
                            },
                            {
                                senderId: new mongoose.Types.ObjectId(receiverId),
                                receiverId: new mongoose.Types.ObjectId(senderId),
                                chatId,
                            }
                        ]
                        await chatListModel.insertMany(chatListData)
                        newChatId = chatId
                    }
                }
                chatObj.chatId = newChatId
                await chatListModel.findOneAndUpdate({
                    senderId: new mongoose.Types.ObjectId(receiverId),
                    receiverId: new mongoose.Types.ObjectId(senderId)
                }, { $set: { unseenCount: checkChatList.unseenCount + 1 } })
                await chatListModel.updateMany({ chatId: newChatId }, { $set: { initChat: true } })
                const newChatMessage = await userChatModel.create(chatObj);

                console.log("Message saved to MongoDB", newChatMessage);
            });

            socket.on("disconnect", () => {
                console.log("User disconnected");
            });
        } catch (error) {
            console.error("Token verification failed:", error.message);
            socket.disconnect(true); // Disconnect the client if token verification fails
        }
    } else {
        console.error("No token provided");
        socket.disconnect(true); // Disconnect the client if no token is provided
    }
});

*/

app.get('/new', function (req, res) {
    res.sendFile(__dirname + "/new_index.html")
})


expressServer.listen(3000, function(){
    console.log("server run on 3000");
})