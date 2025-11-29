

# **UNIMID — Multimodal AI Chatbot**

A real-time multimodal AI chatbot supporting text, file uploads, intelligent conversation, WebSockets, and Socket.IO.

---

# 🧠 **Overview**

**UNIMID** is a full-stack, real-time AI-powered chat platform.
It supports:

* **AI text chat**
* **File upload + file understanding**
* **Google OAuth login**
* **Realtime messaging with Socket.IO**
* **Beautiful animated UI**
* **Frontend + Backend full project**

---

# 🚀 **Features**

### 🔹 **AI & Chat**

* Smart AI-powered responses
* User-to-AI & user-to-user text chat
* Real-time communication using **Socket.IO**

### 🔹 **Multimodal Input**

* File uploads (PDF, text, images)
* File content understanding

### 🔹 **Authentication**

* Google OAuth
* JWT-secured sessions

### 🔹 **Frontend UI**

* Smooth animations
* Rotating text
* Typing animation
* Clean dark/light UI
* Sidebar navigation

### 🔹 **Backend Structure**

* Controllers, models, routes separated
* MongoDB-based chat/message/user storage
* Token-based security middleware

---

# 🧰 **Tech Stack**

### **Frontend**

* React + Vite
* Redux Toolkit
* Axios
* Socket.IO Client

### **Backend**

* Node.js
* Express
* MongoDB + Mongoose
* JWT Authentication
* Google OAuth
* Socket.IO

---

# 📁 **Folder Structure**

## **Backend**

```
backend
│   server.js
│
└── src
    │   app.js
    │
    ├── controller
    │       auth.controller.js
    │       chat.controller.js
    │       msg.controller.js
    │
    ├── db
    │       db.js
    │
    ├── middleware
    │       auth.middlware.js
    │
    ├── models
    │       chat.model.js
    │       msg.model.js
    │       user.model.js
    │
    ├── routes
    │       auth.routes.js
    │       chat.routes.js
    │       msg.routes.js
    │
    ├── service
    │       ai.service.js
    │
    ├── socket
    │       socket.server.js
    │
    ├── webrtc   (future use)
    │
    └── utils
            fileRead.js
            googleAuth.js
```

---

## **Frontend**

```
frontend
│   index.html
│
├── public
│   └── assets
│          plus-dark.png
│
└── src
    │   App.jsx
    │   index.css
    │   main.jsx
    │
    ├── api
    │      authApi.js
    │      axiosInstance.js
    │      fileUploadApi.js
    │
    ├── components
    │      Botmsg.jsx
    │      FileUi.jsx
    │      Fileupload.jsx
    │      Googleauth.jsx
    │      Input.jsx
    │      RotatingText.jsx
    │      Sidebar.jsx
    │      SplitText.jsx
    │      Typinganimation.jsx
    │      Usermsg.jsx
    │
    ├── lib
    │      socketInitilize.js
    │      utils.js
    │
    ├── pages
    │      Home.jsx
    │      Login.jsx
    │      Nav.jsx
    │      SignUp.jsx
    │
    ├── reactBitsEffect
    │      Maintxt.jsx
    │      RotatingTextDemo.jsx
    │
    ├── store
    │    │   store.js
    │    │
    │    └── slice
    │          ├── authSlice
    │          │       authAction.js
    │          │       authSlice.js
    │          │
    │          └── ChatSlice
    │                  chatAction.js
    │                  chatSlic.js
    │                  uploadFileAction.js
    │                  uploadFileSlice.js
    │
    └── utils
           preTitle.jsx

```

---

# 🔧 **Installation**

## 📌 Prerequisites

* Node.js (>= 18)
* MongoDB Atlas or local
* Google OAuth Client ID

---

# 📦 Backend Setup

```sh
cd backend
npm install
```

### **Create `.env` file**

```
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_API_KEY=your_google_api_key
FRONTEND_URL=http://localhost:5173
```

### **Run backend**

```sh
npm run dev
```

---

# 💻 Frontend Setup

```sh
cd frontend
npm install
```

### **Create `.env` file**

```
VITE_BACKEND_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### **Run frontend**

```sh
npm run dev
```

---

# 🔌 **Socket.IO Events**

### **Chat**

* `connect`
* `disconnect`
* `send-message`
* `receive-message`
* `typing`

---

# 📡 **API Routes**

### **Auth**

```
POST /auth/login
POST /auth/google
POST /auth/signup
GET  /auth/me
```

### **Chat**

```
GET    /chat/all
POST   /chat/create
GET    /chat/:id/messages
POST   /chat/send
```

### **Files**

```
POST /upload
```

---

# 🔮 Future Improvements

* Add voice communication (planned)
* User profile system
* Chat themes

---

# ⭐ License

MIT License

---

