import http from "http";
import { Server } from "socket.io";
import app from "./app";
// import { setupSocketHandlers } from "./sockets/socketHandler";
import { setupSocket } from "./sockets/socketManager";

const PORT = process.env.PORT || 3000;

// Create HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ["GET", "POST"],
  },
});

// Setup Socket Handlers
setupSocket(io);
// setupSocketHandlers(io);


// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Socket.io server running on http://localhost:${PORT}`);
});
