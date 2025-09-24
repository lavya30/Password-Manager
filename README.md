# Password Manager with MongoDB

A full-stack password manager application built with React, Node.js, and MongoDB.

## 🏗️ Project Structure

```
password_manager_mongodb/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Manager.jsx    # Main password manager component
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx         # React entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── index.html          # HTML template
├── backend/           # Node.js backend server
│   ├── server.js      # Express server with MongoDB integration
│   ├── package.json   # Backend dependencies
│   └── .env          # Environment variables
└── README.md         # This file
```

## 🚀 Features

- ✅ **Add Passwords**: Store website, username, and password combinations
- ✅ **View Passwords**: Display all saved passwords in a clean table
- ✅ **Edit Passwords**: Modify existing password entries
- ✅ **Delete Passwords**: Remove unwanted password entries
- ✅ **Copy to Clipboard**: One-click password copying
- ✅ **Show/Hide Password**: Toggle password visibility
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Toast Notifications**: User feedback for all actions
- ✅ **MongoDB Integration**: Persistent data storage

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Toastify** - Toast notifications
- **Lord Icon** - Animated icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd password_manager_mongodb
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017
   ```
   
   For MongoDB Atlas, use your connection string:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
   ```

5. **Start MongoDB**
   - **Local MongoDB**: Ensure MongoDB service is running
   - **MongoDB Atlas**: Ensure your cluster is running and accessible

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
node server.js
```
The backend will start on http://localhost:3000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on http://localhost:5173

### Access the Application
Open your browser and navigate to http://localhost:5173

## 📡 API Endpoints

- **GET /** - Retrieve all passwords
- **POST /** - Save a new password
- **DELETE /** - Delete a password by ID

## 🔒 Security Note

⚠️ **Important**: This is a demonstration project. For production use, consider implementing:
- Password encryption/hashing
- User authentication and authorization
- HTTPS/SSL encryption
- Input validation and sanitization
- Rate limiting
- Security headers

## 📝 Usage

1. **Add a Password**: Fill in the website, username, and password fields, then click "Add"
2. **View Passwords**: All saved passwords are displayed in the table below the form
3. **Copy Password**: Click the copy icon next to any password to copy it to clipboard
4. **Edit Password**: Click the "Edit" button to modify an existing entry
5. **Delete Password**: Click the "Delete" button to remove an entry
6. **Show/Hide Password**: Click the "Show" button to toggle password visibility in the form

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused Error**
   - Ensure MongoDB is running
   - Check the MONGO_URI in your .env file
   - Verify the backend server is running on port 3000

2. **CORS Issues**
   - Ensure the backend CORS middleware is properly configured
   - Check that frontend is making requests to the correct backend URL

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again in both frontend and backend directories

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.
