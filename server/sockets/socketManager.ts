import { Server, Socket } from "socket.io";

interface UserSocketMap {
  [username: string]: string; // Maps usernames to socket IDs
}

const userSocketMap: UserSocketMap = {};

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Handle user joining
    socket.on("join", (username: string) => {
      userSocketMap[username] = socket.id;
      console.log(`${username} joined with socket ID: ${socket.id}`);
    });

    // Handle message broadcasting
    socket.on("message", ({ username, message }) => {
      console.log(`Message from ${username}: ${message}`);
      socket.broadcast.emit("message", { username, message });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      for (const [username, id] of Object.entries(userSocketMap)) {
        if (id === socket.id) {
          delete userSocketMap[username];
          console.log(`${username} disconnected`);
          break;
        }
      }
    });
  });
};
