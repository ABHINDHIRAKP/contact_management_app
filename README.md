# 📇 Contact Management App

A full-stack contact manager with user authentication, secure access token handling, and personal contact CRUD operations.

---

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React, Vite, Axios, React Router |
| Backend   | Node.js, Express, Mongoose |
| Auth      | JWT (Access & Refresh Tokens) |
| Database  | MongoDB (Local or Atlas) |
| Tokens    | Stored in localStorage + HttpOnly cookies |

---

## ✨ Features

- 🔐 User registration & login
- 🔁 Auto token refresh with `/api/refresh`
- 👤 JWT-protected routes per user
- 🗂 Create, Read, Update, Delete (CRUD) contacts
- 🧠 React state management with hooks
- 🌐 Axios interceptor for seamless auth
- ☁️ Environment variable support (`.env`)

---

## ⚙️ Setup Instructions

### 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g. MongoDB Atlas)
- Git CLI

---

### 🔧 Backend Setup (`mycontacts-backend/`)

1. Navigate to the backend folder:
```bash
cd mycontacts-backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root of mycontacts-backend/:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```
4. Start the development server:
```bash
npm run dev
```
---

### 🎨 Frontend Setup (mycontacts-frontend/)

1. Navigate to the frontend folder:
```bash
cd mycontacts-frontend
```
2. Install dependencies:
```bash
npm install
```
3. (Optional) Create a .env file if using environment variables:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
4. Start the React app:
```bash
npm run dev
``` 

The frontend will run at default: http://localhost:5173
