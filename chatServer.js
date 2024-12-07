const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8386 });

console.log("WebSocket server is running on ws://localhost:8386");

const clients = new Map(); // Store user connections

server.on("connection", (socket, req) => {
  const userId = req.url.slice(1); // Get userId from URL
  console.log("Extracted userId:", userId);

  // Check if userId is valid
  if (!userId) {
    console.log("No userId provided, closing connection.");
    socket.close();
    return;
  }

  clients.set(userId, socket); // Add socket to user list
  console.log("clients: " + JSON.stringify([...clients.keys()]));
  console.log(`User connected: ${userId}`);

  socket.on("message", (data) => {

    const chatId = JSON.parse(data);

    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    if (typeof chatId !== "string") {
      console.error("Invalid chatId format, expected a string.");
      return;
    }

    console.log(`Received message from ${userId}: ${chatId}`);

    // Split chatId and find the friend's ID
    const [friendId] = chatId.split("_").filter((id) => id !== userId);

    if (!friendId) {
      console.error("Friend ID is not found.");
      return;
    }

    // Loop through the connected clients
    for (let [id, client] of clients) {
      if (id === friendId) {
        // Send the message to the friend's WebSocket
        client.send(JSON.stringify(chatId));
        console.log(`Message sent to ${friendId}`);
      }
    }
  });


  socket.on("close", () => {
    clients.delete(userId); // Remove user when they disconnect
    console.log(`User disconnected: ${userId}`);
  });
});
