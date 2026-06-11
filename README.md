# JobTrackr

JobTrackr is a full-stack job application tracking platform that helps users manage their job search, track application statuses, and avoid duplicate applications by checking company application history.

## Features

- User registration and login
- JWT authentication
- Add job applications
- View all applications
- View application details
- Edit applications
- Delete applications
- Search applications by company
- Filter applications by status
- View company application history
- See the most recent application date for each company
- Duplicate application warning based on recent application history
- Dashboard statistics
- Interview rate, offer rate, and rejection rate tracking

## Live Demo

[View Live Demo](https://jobtrackr-pi.vercel.app/)

Backend API: https://jobtrackr-api-jju9.onrender.com

## Tech Stack

### Frontend
- Angular
- Angular Router
- Angular HttpClient
- HTML
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Core Product Idea

The main feature of JobTrackr is company application history. Before applying to a company again, users can search the company name and see previous applications, the most recent application date, and whether they recently applied.

This helps users avoid applying to the same company too frequently.

## Application Fields

Each application includes:

- Company
- Position
- Location
- Work type
- Status
- Salary range
- Job post URL
- Applied date
- Source
- Notes

## Status Options

- Saved
- Applied
- Interviewing
- Offer
- Rejected

## Dashboard Metrics

- Total Applications
- Saved
- Applied
- Interviewing
- Offers
- Rejected
- Interview Rate
- Offer Rate
- Rejection Rate

## Local Setup

### 1. Clone the repository
```
git clone https://github.com/YOUR_USERNAME/jobtrackr.git
cd jobtrackr
```

### 2. Install backend dependencies
cd server
npm install

### 3. Create backend environment variables
Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### 4. Start backend
npm run dev

Backend runs on:
http://localhost:5000

### 5. Install frontend dependencies
cd ../client
npm install

### 6. Start frontend
ng serve

Frontend runs on:
http://localhost:4200

### API Routes
### Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

### Applications
GET /api/applications
GET /api/applications?company=google
GET /api/applications?status=Applied
GET /api/applications/:id
POST /api/applications
PUT /api/applications/:id
DELETE /api/applications/:id

### Company History
GET /api/companies/:companyName/history

### Dashboard
GET /api/dashboard/stats

### Future Improvements
Interview reminders
Follow-up reminders
Calendar view
Resume version tracking
Cover letter version tracking
CSV export
Kanban board view
Contact tracking
