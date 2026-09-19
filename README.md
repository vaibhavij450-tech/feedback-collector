Feedback Collector
A full-stack feedback management platform where customers can submit, search, edit, and delete their own feedback, while administrators can securely review and manage all responses.
Technologies: React, Node.js, Express.js, MongoDB, REST API, Vercel, Render
1. Live Demo
Customer Application:  
https://feedback-collector-liart.vercel.app
Admin Portal:  
https://feedback-collector-liart.vercel.app/admin/login
Backend API:  
https://feedback-collector-sslq.onrender.com
2. Overview
Feedback Collector is a full-stack application for collecting and managing customer feedback.
Customers can submit feedback, view responses, search and filter records, and manage feedback owned by their browser. Administrators use a separate authenticated dashboard to review and manage feedback across the platform.
The project demonstrates CRUD operations, REST APIs, authentication, authorization, database persistence, secure ownership, responsive design, and cloud deployment.
3. Features
Customer
Submit feedback with name, email, and message
View, search, and filter feedback
Edit and delete feedback owned by the current browser
Delete confirmation
Responsive desktop and mobile interface
Browser-based ownership
Admin
Dedicated admin login
Protected dashboard
View and manage all feedback
Search and date filtering
Backend authorization
Separate customer and admin workflows
4. Customer Ownership
Feedback ownership is handled using a browser-specific token.
Customer submits feedback.
Backend generates an ownership token.
Token is stored in an HTTP-only cookie.
A hashed version is stored in MongoDB.
Edit and delete requests are verified by the backend.
Location	Stored Information
Browser	Ownership token in an HTTP-only cookie
MongoDB	Hashed ownership token
Backend	Verification and authorization logic
Authorization is therefore enforced on the server, not only through frontend controls.
5. Current Ownership Model
Ownership is currently tied to the browser that created the feedback.
Browser / Device	Access
Original browser	Authorized
Another browser	Not automatically authorized
Incognito	Not automatically authorized
Another device	Not automatically authorized
A future account-based system can replace this browser-based model.
6. System Architecture
The application is divided into three simple layers:
Layer	Responsibility	Technology
Frontend	UI, forms, filters, routing, API calls	React, React Router, Vite, CSS
Backend	API, validation, authentication, authorization	Node.js, Express.js
Database	Persistent feedback storage	MongoDB, Mongoose
Request Flow
Customer / Admin  
↓  
React Frontend  
↓  
REST API  
↓  
Express Backend  
↓  
MongoDB  
↓  
API Response  
↓  
React UI Update
Customer and admin interfaces use the same backend but have different permissions and workflows.
7. Application Flow
Customer
Submit feedback → Backend validation → MongoDB storage → Ownership token → Feedback displayed → Search/filter → Edit or delete own feedback
Admin
Admin login → Authentication → Protected dashboard → View/search/filter feedback → Authorized management
8. Technology Stack
Area	Technologies
Frontend	React, JavaScript, CSS3
Routing	React Router
Build Tool	Vite
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	Cookie-based authentication
API	REST API
Security	HTTP-only Cookies, Token Hashing, CORS
Version Control	Git, GitHub
Deployment	Vercel, Render
9. Project Structure
Frontend
```text
frontend/
└── src/
    ├── components/
    │   ├── FeedbackForm.jsx
    │   ├── FeedbackItem.jsx
    │   ├── FeedbackList.jsx
    │   ├── ModalComponent.jsx
    │   └── ProtectedRoute.jsx
    ├── pages/
    │   ├── FeedbackPage.jsx
    │   ├── LoginPage.jsx
    │   └── AdminDashboard.jsx
    ├── services/
    │   ├── feedback-service.js
    │   └── auth-service.js
    ├── App.jsx
    ├── App.css
    └── main.jsx
```
Backend
```text
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── FeedbackController.js
│   └── AuthController.js
├── middleware/
│   └── AuthMiddleware.js
├── models/
│   └── Feedback.js
├── routes/
│   ├── FeedbackRoutes.js
│   └── AuthRoutes.js
├── server.js
└── .env
```
10. API Documentation
Feedback
```http
GET    /api/feedback
POST   /api/feedback
PUT    /api/feedback/own/:id
DELETE /api/feedback/own/:id
DELETE /api/feedback/:id
```
Authentication and Health
```http
POST /api/auth/login
GET  /api/health
```
Example feedback request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "The application is easy to use."
}
```
11. Security
HTTP-only cookies for customer ownership
Hashed ownership tokens in MongoDB
Server-side ownership verification
Protected admin routes
Backend authorization
Environment variables for sensitive configuration
CORS configuration
Separate customer and admin operations
12. Search and Filtering
Feedback can be searched by name, email, or message and filtered by creation date. The Clear button resets all active filters.
13. Responsive Design
The interface is designed for desktop, tablet, and mobile screens. Responsive handling covers feedback forms, cards, search controls, date filters, admin login, and the dashboard.
The application has also been tested locally from a mobile device over the same Wi-Fi network.
14. Local Development
Clone
```bash
git clone https://github.com/vaibhavij450-tech/feedback-collector.git
cd feedback-collector
```
Frontend
```bash
cd frontend
npm install
npm run dev
```
Backend
Open another terminal:
```bash
cd backend
npm install
npm run dev
```
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```
Do not commit `.env` to GitHub.
15. Mobile Local Testing
Run Vite with network access:
```bash
npm run dev -- --host
```
Open the Vite network address, for example:
```text
http://192.168.1.29:5173
```
The frontend detects local-network access and communicates with the local backend.
16. Deployment
Component	Platform
Source Code	GitHub
Frontend	Vercel
Backend	Render
Database	MongoDB
The frontend and backend are deployed separately so each layer can be maintained independently.
17. Challenges and Solutions
Customer Ownership
Implemented browser-specific ownership using an HTTP-only token and backend verification.
Frontend vs Backend Authorization
UI controls only reflect permissions; protected operations are independently checked by the backend.
Mobile Local Development
Added local-network API detection and corresponding backend CORS handling.
Mobile Date Input
Added a custom placeholder layer around the native date input for a more consistent mobile experience.
Customer and Admin Separation
Implemented separate workflows with protected administrative access.
18. Future Scope
The current system can be extended into a larger feedback management platform through the following improvements:
Customer and Access Management
Customer registration, login, logout, email verification, password reset, and profile management
Google/GitHub authentication
Cross-browser and cross-device feedback access
Role-based access for Super Admins and Moderators
Feedback Management
Categories and tags such as Bug Report, Feature Request, UI/UX, Performance, Payment, and Support
Priority levels: Low, Medium, High, Critical
Status tracking: New, Under Review, In Progress, Resolved, Closed
Direct admin responses and customer communication
Analytics and Notifications
Feedback trends and category distribution
Priority and resolution analytics
Average resolution time and satisfaction trends
Email, in-app, and push notifications
Search and Performance
Date ranges and combined filters
Server-side pagination and sorting
Database indexing and optimized queries
Lazy loading and infinite scrolling
Security and Reliability
Rate limiting and stronger input validation
Security headers and stricter CORS policies
Stronger session and password protection
Audit logs for administrative actions
Automated unit, integration, API, and end-to-end testing
CI/CD using GitHub Actions
AI and Platform Enhancements
Sentiment analysis
Automatic categorization and summarization
Duplicate detection and recurring issue detection
Trend and priority recommendations
Progressive Web App support
19. Development Roadmap
Completed Development
Area	Status
Feedback submission and storage	Completed
Feedback listing, search, and date filtering	Completed
Browser-based customer ownership	Completed
Customer edit and delete	Completed
Backend ownership verification	Completed
Admin authentication and protected dashboard	Completed
Admin feedback management	Completed
Responsive desktop and mobile interface	Completed
Mobile local-network testing	Completed
Vercel and Render deployment	Completed
Planned Development
Area	Planned Work
Customer accounts	Account-based ownership and cross-device access
Feedback organization	Categories, tags, status, and priority
Communication	Admin responses and notifications
Analytics	Trends, resolution metrics, and reporting
Search and performance	Advanced filters, pagination, indexing, optimization
Access control	Multiple administrator roles and audit logs
Quality	Automated testing and CI/CD
AI features	Sentiment, categorization, summaries, and issue detection
Platform	Progressive Web App support
20. Learning Outcomes
This project provided practical experience with:
React and component architecture
React Router and state management
REST API development
Node.js and Express.js
MongoDB and Mongoose
CRUD operations
Authentication and authorization
HTTP-only cookies and token hashing
CORS and environment variables
Responsive web development
Git, GitHub, Vercel, and Render
21. Project Highlights
Full-Stack Flow
React Frontend → REST API → Express Backend → MongoDB
Secure Ownership
Customer Edit/Delete actions are verified by the backend.
Separate Admin Experience
Administrative operations are protected through authentication and authorization.
Responsive and Deployed
The application supports desktop and mobile layouts and is deployed using Vercel, Render, and MongoDB.
22. Contributing
```bash
git clone https://github.com/vaibhavij450-tech/feedback-collector.git
cd feedback-collector
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```
Then open a Pull Request.
23. License
This project was created for learning, experimentation, and portfolio demonstration purposes.
24. Author
Vaibhavi Jain  
DIT University, Dehradun  
GitHub: https://github.com/vaibhavij450-tech
