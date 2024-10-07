import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', function(socket) {
  socket.on("content", function (data) {
    console.log(data);

    io.emit("content", data);

    // Spara till databas och göra annat med data
});
});

app.get("/", (req, res) => res.send("io server"));

httpServer.listen(8337, () => {
    console.log('server running at http://localhost:8337');
});