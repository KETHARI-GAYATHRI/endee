# ResumeAI - Smart AI-Powered Resume Search System

![ResumeAI Banner](https://img.shields.io/badge/AI--Powered-HR--Tech-blue?style=for-the-badge&logo=google-gemini)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**ResumeAI** is a premium, production-level SaaS platform designed to streamline the hiring process. By leveraging **Google Gemini AI**, it automates the extraction of candidate data, analyzes skills matching, and provides smart search capabilities to help HR teams find the perfect talent in seconds.

---

## 🚀 Key Features

- **🧠 AI-Powered Analysis**: Automatically parses resumes (PDF) and extracts key information using Gemini AI.
- **🔍 Smart Search**: Intelligent filtering and searching based on job requirements and skill sets.
- **📊 Matching & Scoring**: Assigns scores to candidates based on their relevance to job criteria.
- **📱 Responsive Dashboard**: A clean, modern UI for managing resumes, candidates, and reports.
- **🗂️ Candidate Management**: Complete lifecycle tracking with status updates (Shortlisted, Rejected, etc.).
- **🔒 Secure Authentication**: Support for both traditional Email/Password login and **Google OAuth 2.0**.
- **📈 Insightful Reports**: Visual representation of hiring data using Chart.js.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Modern CSS3)
- **Icons**: Lucide React
- **Charts**: Chart.js / React-Chartjs-2
- **Routing**: React Router DOM

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Sequelize ORM)
- **AI Engine**: Google Gemini Pro API
- **Authentication**: Passport.js (Google Strategy) & JWT
- **File Parsing**: PDF-Parse & Multer

---

## ⚙️ Installation & Setup

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v16+)
- [MySQL Server](https://www.mysql.com/)
- [Google Cloud Account](https://console.cloud.google.com/) (For AI Key and OAuth ID)

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd Ai1
```

### **2. Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=resume_ai_db
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   FRONTEND_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   ```
4. Initialize the database:
   ```bash
   mysql -u your_user -p < schema.sql
   ```

### **3. Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../resume-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

---

## 🏃 Running the Application

### **Start Backend**
```bash
cd Backend
npm run dev
```

### **Start Frontend**
```bash
cd resume-ai
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```text
Ai1/
├── Backend/                 # Express Server & DB Logic
│   ├── src/
│   │   ├── controllers/     # API request handlers
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # Express routes
│   │   ├── services/        # AI & Core logic
│   │   └── server.js        # Entry point
│   └── schema.sql           # Database schema
├── resume-ai/               # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI elements
│   │   ├── context/         # Auth & Candidate state
│   │   ├── pages/           # Main application screens
│   │   └── App.jsx          # Main root component
└── README.md                # Project documentation
```

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built with ❤️ by ResumeAI Team*
