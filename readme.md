# UnLinked – Professional Networking & Job Platform

UnLinked is a full-stack web application inspired by LinkedIn, built with the MERN stack (MongoDB, Express, React, Node.js). It enables users to connect, share posts, manage professional profiles, and apply for jobs.

---

## 🚀 Features

- **Authentication**
  - Email/password signup & login
  - Google OAuth login
- **User Profiles**
  - Editable profile with photo, headline, about, skills, education, and experience
- **Networking**
  - Send, accept, and reject connection requests
  - View and manage your network
- **Feed & Posts**
  - Create, like, comment, and delete posts
  - Real-time notifications for likes, comments, and connections
- **Jobs**
  - Recruiters can post jobs and manage applicants
  - Users can browse and apply to jobs with resume links
  - Application status tracking (applied, shortlisted, rejected)
- **Responsive UI**
  - Modern, mobile-friendly design using Tailwind CSS and DaisyUI

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React Query, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, Passport.js (Google OAuth)
- **Email:** Mailtrap (for development/testing)
- **Deployment:** Render (backend), Vercel/Netlify (frontend) or served from backend in production

---

## 📦 Project Structure
UnLinked/ ├── backend/ │ ├── controllers/ │ ├── cron/ │ ├── emails/ │ ├── lib/ │ ├── middleware/ │ ├── models/ │ ├── routers/ │ ├── utils/ │ ├── server.js │ └── ... ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── lib/ │ │ └── ... │ ├── index.html │ ├── tailwind.config.js │ ├── vite.config.js │ └── ... └── .env


---

## ⚙️ Environment Variables

### Backend (`.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development

CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MAILTRAP_TOKEN=your_mailtrap_token
EMAIL_FROM=your_email@domain.com
EMAIL_FROM_NAME=Your Name

CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_SECRET=your_cloudinary_secret


Frontend (frontend/.env)
VITE_API_URL=http://localhost:4000/api/v1


🛠️ Setup & Run Locally
1. Clone the repository
git clone https://github.com/yourusername/UnLinked.git
cd UnLinked


2. Backend Setup
cd backend
npm install
# Create and configure .env as shown above
npm run dev

3. Frontend Setup
cd frontend
npm install
# Create and configure .env as shown above
npm run dev


Frontend: http://localhost:5173
Backend: http://localhost:4000
🌐 Deployment
Backend: Deploy to Render or similar.
Frontend: Deploy to Vercel, Netlify, or serve from backend.
Environment Variables: Set all secrets and URLs in your deployment dashboard.
🔑 Google OAuth Setup
Go to Google Cloud Console.
Create OAuth credentials.
Set Authorized redirect URIs:
http://localhost:4000/api/v1/auth/google/callback
https://your-production-backend/api/v1/auth/google/callback
Set Authorized JavaScript origins:
http://localhost:5173
https://your-production-frontend
📬 Email (Mailtrap)
Sign up at Mailtrap.
Get your API token and set it in .env.
📝 License
This project is for educational purposes and is not affiliated with LinkedIn.

🙏 Acknowledgements
React
Tailwind CSS
DaisyUI
MongoDB
Render
Mailtrap
💡 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📣 Contact
For questions or support, open an issue or contact your-email@example.com.





















