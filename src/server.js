require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { startWhatsApp, getClient, isReady } = require("./whatsapp");
const { toJid } = require("./utils");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

startWhatsApp(io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.emit("connected");
});

app.get("/", (req, res) => {
  res.json({ status: "running" });
});

app.post("/send", async (req, res) => {
  try {
    if (!isReady()) {
      return res.status(400).json({ error: "WhatsApp not ready yet" });
    }

    const { number, message } = req.body;

    if (!number || !message) {
      return res.status(400).json({ error: "number & message required" });
    }

    const jid = toJid(number);
    const client = getClient();

    const result = await client.sendMessage(jid, message);

    res.json({
      success: true,
      messageId: result.id.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.listen(process.env.PORT, () => {
  console.log("Server running on PORT", process.env.PORT);
});
