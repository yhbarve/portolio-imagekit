# Media App (Portolio)

A modern MERN‑stack application for users to upload and display **photos**. It features direct client‑to‑ImageKit uploads, JWT‑based authentication, and a responsive gallery with uniform image sizing.

---

## 🏗️ Tech Stack

* **Frontend:** React, React Router, React Hook Form, Axios, Zod, Tailwind CSS, imagekitio‑react
* **Backend:** Node.js, Express, Mongoose, Zod, JSON Web Tokens
* **Database & Storage:** MongoDB Atlas for metadata, ImageKit for media storage and optimization

---

## ⚙️ Features

* **User Authentication:** Signup, login, JWT generation, and protected routes
* **Direct Uploads:** Client‑side direct uploads to ImageKit with signed authentication
* **Image-Only Support:** Server‑side guard against non-image uploads
* **Persistent Metadata:** Save and retrieve image URLs and owner info in MongoDB
* **Responsive Gallery:** Uniform square layout, letterboxing for varying aspect ratios

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* npm or yarn
* MongoDB Atlas account (or local MongoDB)
* ImageKit account & credentials

### 1. Clone the repo

```bash
git clone https://github.com/<YOUR_USERNAME>/media-app.git
cd media-app
```

### 2. Setup backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
MONGODB_URI=your_mongo_connection_string
DB_NAME=media_app
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm run dev   # (uses nodemon)
# or
npm start
```

### 3. Setup frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/` with:

```
VITE_BACKEND_URL=http://localhost:5000
VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id/
```

Start the frontend:

```bash
npm run dev   # (Vite)
# or
npm start     # (Create React App)
```

Open [http://localhost:3000](http://localhost:3000) (or your Vite URL) in your browser.

---

## 🗂️ Project Structure

```
media-app/
├── backend/            # Express API
│   ├── src/
│   │   ├── middleware/ # auth & validation
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # user & media routes
│   │   ├── schemas/    # Zod schemas
│   │   └── index.js    # server entry point
│   ├── .env            # environment variables
│   └── package.json
└── frontend/           # React app
    ├── public/         # static assets & video backgrounds
    ├── src/
    │   ├── components/ # MediaUpload, Navbar, etc.
    │   ├── pages/      # Signup, Login, Upload, Gallery, Home
    │   ├── api/        # axios instance, auth helpers
    │   └── App.jsx     # main router
    ├── .env.local      # Vite or CRA env vars
    └── package.json
```

---

## 📜 Available Scripts

### Backend

* `npm run dev` — start with hot‑reload (nodemon)
* `npm start` — run the server

### Frontend (CRA)

* `npm start` — start development server
* `npm run build` — create production build

### Frontend (Vite)

* `npm run dev` — start Vite server
* `npm run build` — build for production

---

## 🔒 Security & Notes

* **Never commit** your `.env` files. They are included in `.gitignore`.
* This project only supports **image** uploads; videos are rejected.
* For production, tighten CORS, rate‑limit uploads, and enable HTTPS.

---

## 📄 License

MIT © Yash Harshal Barve
