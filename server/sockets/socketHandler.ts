import { Server, Socket } from "socket.io";
import { handleUserMessage } from "../services/chat.service";
import conversationHistory from "../store/conversationStore";


export const setupSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      const { message } = data;
      try {
        const history = conversationHistory.get(socket.id) || [
          { role: "system", content: "You are a helpful assistant." },
        ];
        history.push({ role: "user", content: message });

        const aiMessageContent = await handleUserMessage(history);
        const aiMessage = { role: "assistant", content: aiMessageContent };
        history.push(aiMessage);

        conversationHistory.set(socket.id, history);
        socket.emit("message", aiMessage);
      } catch (error) {
        console.error("Error handling user message:", error);
        socket.emit("error", "There was an issue processing your request.");
      }
    });

    socket.on("clearHistory", () => {
      conversationHistory.set(socket.id, [
        { role: "system", content: "You are a helpful assistant." },
      ]);
      socket.emit("historyCleared");
    });

    socket.on("disconnect", () => {
      conversationHistory.delete(socket.id);
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
