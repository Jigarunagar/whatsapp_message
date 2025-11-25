const { Client, LocalAuth } = require("whatsapp-web.js");
const QRCode = require("qrcode");

let client = null;
let WA_READY = false;

function startWhatsApp(io) {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: false,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    }
  });

  client.on("qr", async (qr) => {
    console.log("QR RECEIVED");
    io.emit("qr", await QRCode.toDataURL(qr));
  });

  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
    io.emit("authenticated");
  });

  client.on("ready", () => {
    WA_READY = true;
    console.log("WHATSAPP READY");
    io.emit("ready");
  });

  client.on("disconnected", () => {
    WA_READY = false;
    console.log("DISCONNECTED");
    io.emit("disconnected");
  });

  client.initialize();
}

module.exports = { startWhatsApp, getClient: () => client, isReady: () => WA_READY };
