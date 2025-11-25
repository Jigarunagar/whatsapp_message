# 📦 WhatsApp Backend – Node.js + whatsapp-web.js + Socket.io

A complete backend-only WhatsApp automation server using **Node.js**, **Express**, **Socket.io**, and **whatsapp-web.js**.
This backend supports QR login, sending messages, receiving messages, and real-time events.

---

## 🚀 Features

* ✔ WhatsApp Web automation with `whatsapp-web.js`
* ✔ Real-time QR code over Socket.io
* ✔ Automatic session saving (no QR needed again)
* ✔ REST API to send WhatsApp messages
* ✔ Real-time incoming messages
* ✔ Safe API (no crashes when WhatsApp is not ready)
* ✔ Fully backend (no frontend required)
* ✔ Uses `.env` for PORT and settings

---

## 📁 Project Structure

```
whatsapp-backend/
├── package.json
├── .env
├── README.md
└── src/
    ├── server.js        # Express + Socket.io server
    ├── whatsapp.js      # WhatsApp client logic
    └── utils.js         # Number formatting helper
```

---

## ⚙️ Installation

### 1. Create Project Folder

```bash
mkdir whatsapp-backend
cd whatsapp-backend
```

### 2. Initialize NPM

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express socket.io whatsapp-web.js qrcode dotenv
npm install --save-dev nodemon
```

---

## 🧾 Create `.env` File

```
PORT=3000
WA_HEADLESS=true
```

---

## ▶️ Start the Server

### Development (auto restart)

```bash
npm run dev
```

### Production

```bash
npm start
```

You will see:

```
QR RECEIVED
Scan QR using WhatsApp → Linked Devices
```

---

## 📱 WhatsApp Login (QR Code)

When the backend boots, it emits a QR code via **Socket.io**.

Clients receive:

```json
"qr": "data:image/png;base64,...."
```

You can display as `<img src="qrBase64" />`.

---

## 🔌 Socket.io Events

| Event           | Description                    |
| --------------- | ------------------------------ |
| `connected`     | Socket successfully connected  |
| `qr`            | QR code generated (base64 PNG) |
| `authenticated` | WhatsApp login successful      |
| `ready`         | WhatsApp client ready          |
| `message`       | Incoming messages              |
| `disconnected`  | WhatsApp disconnected          |

---

## 📤 REST API – Send WhatsApp Message

### URL

```
POST /send
```

### Body

```json
{
  "number": "919876543210",
  "message": "Hello from Node.js"
}
```

### Response

```json
{
  "success": true,
  "messageId": "ABCD12345"
}
```

---

## 🧠 Number Formatting

Backend automatically converts:

```
919876543210 → 919876543210@c.us
```

Handled inside `utils.js`.

---

## 🧪 Curl Test

```bash
curl -X POST http://localhost:3000/send \
-H "Content-Type: application/json" \
-d '{"number":"919876543210","message":"Hello"}'
```

---

## 🔐 Session Persistence

`LocalAuth()` saves your WhatsApp session to:

```
~/.wwebjs_auth/
```

Delete this folder to logout and generate a new QR.

---

## ❗ Troubleshooting

### 1. Error: getChat undefined

Reason: WhatsApp not ready
Fix: Backend already checks with `isReady()`.

### 2. QR not showing

Ensure your WebSocket client listens to:

```
socket.on("qr")
```

### 3. Chrome / Puppeteer Errors (Linux)

```bash
sudo apt install chromium-browser
```

---

## 🛠 Scripts

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 🧱 Technologies Used

* Node.js
* Express
* Socket.io
* whatsapp-web.js
* QRCode
* dotenv
* Nodemon

---

## 🚀 Future Upgrades (Optional)

* Docker support
* Multi-number / Multi-device
* Admin dashboard
* PM2 ecosystem config
* Token-protected API
* Webhook support
* Message scheduling

---

## 📌 Author

Backend developed for WhatsApp automation using Node.js and Socket.io.

---

README Complete ✔
