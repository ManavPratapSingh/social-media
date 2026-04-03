# Social Media Application

A modern, full-stack social media platform built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

## 🚀 Features

- **Authentication**: Secure user login and registration using JWT and Bcrypt.
- **User Profiles**: Personalized user profiles with customizable information.
- **Post Management**: Create, view, update, and delete posts with image support.
- **Stories**: Share temporary updates using the Stories feature.
- **Image Uploads**: Integrated with Cloudinary for efficient image storage and management.
- **State Management**: Robust state handling on the client-side using Redux Toolkit.
- **Modern UI**: Stylish and responsive design built with Tailwind CSS.

## 🛠️ Tech Stack

**Client:**
- React 19 + Vite
- Redux Toolkit (State Management)
- Tailwind CSS 4 (Styling)
- Axios (API Requests)
- React Router Dom (Navigation)

**Server:**
- Node.js + Express
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- Cloudinary (Media Storage)
- Multer (File Handling)

## 📂 Project Structure

```text
social-media/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── redux/       # Redux store and slices
│   │   └── ...
├── server/              # Backend Node.js application
│   ├── config/          # Database and other configurations
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose models
│   ├── routes/          # API endpoints
│   └── ...
└── README.md
```

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary](https://cloudinary.com/) Account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd social-media
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following:
   ```env
   dbURL = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret
   CLOUD_NAME = your_cloudinary_name
   CLOUD_API_KEY = your_cloudinary_api_key
   CLOUD_API_SECRET = your_cloudinary_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

### Server
- `npm run dev`: Starts the backend server using `nodemon`.

### Client
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.