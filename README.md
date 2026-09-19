Feedback Collector
A full-stack feedback management platform where customers can submit, search, edit, and delete their own feedback, while administrators can securely review and manage responses through a protected dashboard.
Technologies: React, Node.js, Express.js, MongoDB, REST API, Vercel, Render
---
1. Live Demo
Customer Application  
https://feedback-collector-liart.vercel.app
Admin Portal  
https://feedback-collector-liart.vercel.app/admin/login
Backend API  
https://feedback-collector-sslq.onrender.com
---
2. Overview
Feedback Collector is a full-stack web application designed to provide a simple and structured platform for collecting and managing customer feedback.
Customers can submit feedback, view responses, search and filter feedback, and manage feedback that belongs to their browser.
Administrators have access to a dedicated authenticated dashboard where they can view, search, filter, and manage feedback across the platform.
The project focuses on real-world full-stack concepts including CRUD operations, REST APIs, authentication, authorization, database persistence, secure ownership, responsive UI, and cloud deployment.
---
3. Features
3.1 Customer Features
Submit feedback with name, email, and message
View submitted feedback
Search feedback by name, email, or message
Filter feedback by date
Clear active filters
Edit feedback owned by the current browser
Delete feedback owned by the current browser
Delete confirmation
Responsive desktop and mobile interface
Browser-based feedback ownership
3.2 Admin Features
Dedicated admin login
Protected admin dashboard
View all feedback
Search feedback
Filter feedback by date
Delete feedback
Backend authorization
Separate customer and admin workflows
---
4. Customer Ownership
Customer feedback is protected using a browser-specific ownership mechanism.
When feedback is created, the following process takes place:
The customer submits feedback.
The backend generates an ownership token.
The token is stored in the browser using an HTTP-only cookie.
A hashed version of the token is stored in MongoDB.
When the customer requests an edit or delete operation, the backend compares the ownership information.
The operation is allowed only when the ownership check succeeds.
Ownership Storage
Location	Stored Information
Customer Browser	Ownership token in an HTTP-only cookie
MongoDB	Hashed ownership token
Backend	Verification and authorization logic
This ensures that authorization is enforced on the server, rather than relying only on frontend controls.
---
5. Current Ownership Model
The current implementation associates feedback ownership with the browser that created it.
This means:
Browser or Device	Access to the Original Feedback
Chrome used to create the feedback	Owns the feedback
Firefox	Not automatically authorized
Incognito	Not automatically authorized
Another device	Not automatically authorized
This is intentional in the current implementation because ownership is based on the browser's HTTP-only cookie rather than a permanent customer account.
---
6. System Architecture
The project follows a straightforward three-layer full-stack structure. Each layer has a defined responsibility, which keeps the application easier to develop, test, and extend.
6.1 Architecture Overview
Application Layer	Responsibility	Main Technologies
Frontend	Pages, forms, filters, routing, user interactions, and API communication	React, React Router, JavaScript, CSS3, Vite
Backend	API routes, validation, authentication, authorization, and business logic	Node.js, Express.js
Database	Persistent storage and retrieval of feedback data	MongoDB, Mongoose
6.2 How the Application Works
The application follows this request-response sequence:
Step 1 — User Interface  
The customer or administrator interacts with the React application.
Step 2 — API Request  
The frontend sends the required request to the Express.js backend through the REST API.
Step 3 — Backend Processing  
The backend validates the request and applies authentication or authorization checks when required.
Step 4 — Database Operation  
Mongoose is used to read from or write to MongoDB when persistent data is required.
Step 5 — API Response  
The backend returns the result to the frontend.
Step 6 — Interface Update  
React updates the page based on the returned data or error.
6.3 Customer and Admin Separation
Both customer and administrator interfaces communicate with the same backend, but their responsibilities and permissions are different.
Customer access is focused on submitting feedback and managing feedback owned by the current browser.
Administrator access is protected by authentication and is intended for viewing and managing feedback across the application.
---
7. Application Flow
7.1 Customer Flow
Open the application.
Submit feedback.
Backend validates the request.
Feedback is stored in MongoDB.
Ownership token is generated and stored.
Feedback is displayed in the application.
Customer can search or filter feedback.
Customer can edit or delete feedback owned by the current browser.
7.2 Admin Flow
Open the admin login page.
Enter administrator credentials.
Backend authenticates the administrator.
Protected route allows access to the dashboard.
Administrator views feedback.
Administrator searches or filters feedback.
Administrator manages feedback through authorized operations.
---
8. Technology Stack
Layer	Technologies
Frontend	React, JavaScript, CSS3
Routing	React Router
Build Tool	Vite
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	Cookie-based authentication
API	REST API
Security	HTTP-only Cookies, Token Hashing, CORS
Version Control	Git, GitHub
Frontend Deployment	Vercel
Backend Deployment	Render
---
9. Project Structure
The project is divided into separate frontend and backend applications.
9.1 Frontend
frontend/
src/
components/
`FeedbackForm.jsx`
`FeedbackItem.jsx`
`FeedbackList.jsx`
`ModalComponent.jsx`
`ProtectedRoute.jsx`
pages/
`FeedbackPage.jsx`
`LoginPage.jsx`
`AdminDashboard.jsx`
services/
`feedback-service.js`
`auth-service.js`
`App.jsx`
`App.css`
`main.jsx`
`package.json`
`vite.config.js`
9.2 Backend
backend/
config/
`database.js`
controllers/
`FeedbackController.js`
`AuthController.js`
middleware/
`AuthMiddleware.js`
models/
`Feedback.js`
routes/
`FeedbackRoutes.js`
`AuthRoutes.js`
`server.js`
`package.json`
`.env`
9.3 Root Files
`README.md`
---
10. API Documentation
10.1 Feedback Endpoints
Get Feedback
```http
GET /api/feedback
```
Returns feedback records and determines ownership for the current browser.
Create Feedback
```http
POST /api/feedback
```
Example request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "The application is easy to use."
}
```
Update Own Feedback
```http
PUT /api/feedback/own/:id
```
Updates feedback after verifying customer ownership.
Delete Own Feedback
```http
DELETE /api/feedback/own/:id
```
Deletes feedback after verifying customer ownership.
Admin Delete
```http
DELETE /api/feedback/:id
```
Deletes feedback after verifying administrator authorization.
10.2 Authentication Endpoints
Admin Login
```http
POST /api/auth/login
```
Authenticates the administrator.
Health Check
```http
GET /api/health
```
Checks whether the backend API is running.
---
11. Security
The application implements several security-oriented practices:
HTTP-only cookies for customer ownership
Hashed ownership tokens in MongoDB
Server-side ownership verification
Protected admin routes
Backend authorization
Environment variables for sensitive configuration
CORS configuration
Separation of customer and administrator operations
The frontend is not treated as the final authorization layer. Protected operations are verified by the backend.
---
12. Search and Filtering
Feedback can be searched using:
Name
Email
Message
Feedback can also be filtered by creation date.
The Clear action resets the active filters.
---
13. Responsive Design
The application is designed for:
Desktop
Mobile
Tablet
Responsive behavior includes:
Feedback forms
Feedback cards
Search controls
Date filters
Admin login
Admin dashboard
Mobile-friendly spacing and typography
The application has also been tested over a local network using a mobile device.
---
14. Local Development
14.1 Clone the Repository
```bash
git clone https://github.com/vaibhavij450-tech/feedback-collector.git
cd feedback-collector
```
14.2 Install Frontend Dependencies
```bash
cd frontend
npm install
```
14.3 Install Backend Dependencies
Open another terminal:
```bash
cd backend
npm install
```
14.4 Configure Environment Variables
Create:
```text
backend/.env
```
Example:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```
Do not commit `.env` to GitHub.
14.5 Start the Backend
```bash
cd backend
npm run dev
```
Backend:
```text
http://localhost:5000
```
14.6 Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend:
```text
http://localhost:5173
```
---
15. Mobile Local Testing
To test the application from a mobile device connected to the same Wi-Fi:
```bash
npm run dev -- --host
```
Vite will provide a network address similar to:
```text
http://192.168.1.29:5173
```
Open the network address from the mobile device.
The frontend detects local-network access and communicates with the local backend accordingly.
---
16. Deployment
The application uses a separate frontend and backend deployment architecture.
Component	Platform	Responsibility
Source Code	GitHub	Version control and repository hosting
Frontend	Vercel	React application
Backend	Render	Node.js and Express API
Database	MongoDB	Persistent application data
This architecture allows each layer to be maintained and deployed independently.
---
17. Challenges and Solutions
17.1 Customer Ownership
Challenge:  
Customers needed to edit and delete their own feedback without gaining access to another customer's feedback.
Solution:  
Implemented browser-specific ownership using an HTTP-only token and backend verification.
17.2 Frontend vs Backend Authorization
Challenge:  
Hiding an Edit or Delete button does not provide real authorization.
Solution:  
The backend independently verifies ownership before allowing protected operations.
17.3 Mobile Local Development
Challenge:  
The application needed to communicate correctly when accessed from a mobile device over the local network.
Solution:  
Implemented local-network detection on the frontend and corresponding CORS handling on the backend.
17.4 Mobile Date Input
Challenge:  
Native date inputs can behave differently across browsers, particularly on mobile devices.
Solution:  
Implemented a custom placeholder layer around the native date input to provide a consistent interface.
17.5 Customer and Admin Separation
Challenge:  
Customer and administrative functionality require different permissions.
Solution:  
Implemented separate customer and admin routes with protected administrative access.
---
18. Future Scope
The current application provides the foundation for a larger feedback management platform. The following improvements can be added as the project evolves.
18.1 Customer Accounts
Introduce permanent customer accounts with:
Registration
Login
Logout
Email verification
Password reset
Profile management
Google/GitHub authentication
The ownership model could evolve from a browser-based approach to an account-based approach.
Current model:
Browser  
-> Ownership Cookie  
-> Feedback
Future model:
Customer Account  
-> Authentication  
-> Customer ID  
-> Feedback
18.2 Cross-Browser and Cross-Device Access
With customer authentication, users could manage their feedback from desktops, mobile devices, tablets, and multiple browsers.
18.3 Admin-Customer Communication
Allow administrators to respond directly to customer feedback and create a complete feedback conversation.
18.4 Feedback Status Tracking
Introduce the following status flow:
New
Under Review
In Progress
Resolved
Closed
Customers could track the progress of their feedback.
18.5 Categories and Tags
Introduce categories such as:
Bug Report
Feature Request
UI/UX
Performance
Payment
Account
Support
General
18.6 Priority Management
Allow administrators to assign:
Low
Medium
High
Critical
18.7 Analytics Dashboard
Future analytics could include:
Total feedback
Feedback trends
Category distribution
Priority distribution
Resolved vs unresolved feedback
Average resolution time
Customer satisfaction trends
18.8 Notifications
Add email, in-app, and push notifications for important customer and administrator events.
18.9 Advanced Search
Support combined filters for:
Keyword
Date range
Category
Status
Priority
Customer
18.10 Pagination and Performance
Introduce server-side pagination, database indexing, optimized queries, sorting, lazy loading, and infinite scrolling for larger datasets.
18.11 Role-Based Access Control
Introduce roles such as:
Role	Responsibilities
Super Admin	Manage Admins, Manage Users, View Analytics, Manage Feedback
Moderator	View Feedback, Respond, Update Status
18.12 Audit Logs
Track important administrative actions such as logins, updates, deletions, status changes, and responses.
18.13 AI-Powered Feedback Analysis
Future AI capabilities could include:
Sentiment analysis
Automatic categorization
Feedback summarization
Keyword extraction
Duplicate detection
Trend identification
Priority recommendations
Recurring issue detection
18.14 Automated Testing
Introduce unit, integration, API, and end-to-end testing using tools such as React Testing Library, Vitest, Supertest, Playwright, or Cypress.
18.15 CI/CD
GitHub Actions could automate the following process:
Push Code
Lint
Run Tests
Build
Deploy
18.16 Production Security Hardening
Future improvements could include:
Rate limiting
Input validation
Input sanitization
Security headers
Strong password hashing
Login attempt protection
Session management
HTTPS-only cookies
Strict CORS policies
CSRF protection where applicable
18.17 Progressive Web App
The application could eventually become a PWA with installable mobile support, push notifications, caching, and an app-like experience.
---
19. Development Roadmap
The project has been developed in stages. The current implementation is complete for the core feedback collection and administration workflow, while the next stage focuses on making the platform more scalable and account-based.
19.1 Completed Development
Area	Current Implementation	Status
Feedback submission	Customers can submit name, email, and message	Completed
Feedback listing	Submitted feedback is displayed in the application	Completed
Database persistence	Feedback is stored in MongoDB	Completed
Search	Search by name, email, or message	Completed
Date filtering	Filter feedback by creation date	Completed
Customer ownership	Browser-based ownership is assigned to submitted feedback	Completed
Customer edit	Owners can edit their own feedback	Completed
Customer delete	Owners can delete their own feedback	Completed
Delete confirmation	Confirmation is shown before customer deletion	Completed
Backend ownership verification	Protected customer operations are checked by the backend	Completed
Admin authentication	Dedicated administrator login	Completed
Protected admin dashboard	Dashboard access requires authentication	Completed
Admin feedback management	Administrators can manage feedback across the platform	Completed
Responsive customer UI	Customer interface supports different screen sizes	Completed
Responsive admin login	Admin login is responsive on mobile and desktop	Completed
Mobile testing	Application tested through a local mobile network	Completed
Frontend deployment	React application deployed on Vercel	Completed
Backend deployment	Node.js and Express API deployed on Render	Completed
19.2 Planned Development
Planned Area	Purpose
Customer accounts	Replace browser-based ownership with permanent user accounts
Cross-browser ownership	Allow authenticated customers to manage feedback from different browsers
Cross-device access	Allow customers to access their feedback from multiple devices
Feedback categories	Organize feedback into meaningful categories
Tags	Add flexible labels for better organization
Status tracking	Track feedback from submission through resolution
Priority management	Help administrators organize issues by priority
Admin responses	Allow administrators to respond directly to customers
Email notifications	Notify users about important feedback updates
In-app notifications	Provide application-level update notifications
Analytics dashboard	Provide reporting and trend information
Pagination	Improve performance when the feedback collection grows
Advanced search	Support multiple filters and combined search conditions
Role-based access control	Support different levels of administrator access
Audit logs	Record important administrative actions
Automated testing	Add unit, integration, API, and end-to-end test coverage
CI/CD	Automate validation, build, testing, and deployment
AI-powered feedback analysis	Add sentiment, categorization, summaries, and issue detection
Progressive Web App support	Provide an installable app-like experience
This roadmap is intended as a development plan rather than a fixed timeline. Features can be implemented incrementally as the application grows.
---
20. Learning Outcomes
This project provided hands-on experience with:
React component architecture
React Router
State management
REST APIs
Node.js
Express.js
MongoDB
Mongoose
CRUD operations
Authentication
Authorization
HTTP-only cookies
Token hashing
CORS
Responsive web development
Error handling
Environment variables
Git and GitHub
Cloud deployment
Vercel
Render
Local network testing
---
21. Project Highlights
Full-Stack Architecture
The application follows a simple full-stack flow:
React Frontend
-> REST API
-> Express Backend
-> MongoDB
Secure Customer Ownership
Customer Edit/Delete operations are verified by the backend rather than relying only on frontend controls.
Separate Admin Experience
Administrative operations are isolated behind authentication and protected routes.
Responsive Interface
The application works across desktop, tablet, and mobile screen sizes.
Production Deployment
The application is deployed using Vercel, Render, and MongoDB.
---
22. Contributing
Contributions, suggestions, and improvements are welcome.
Clone the Repository
```bash
git clone https://github.com/vaibhavij450-tech/feedback-collector.git
cd feedback-collector
```
Create a Feature Branch
```bash
git checkout -b feature/your-feature
```
Make Your Changes
```bash
git add .
git commit -m "Add your feature"
```
Push Your Branch
```bash
git push origin feature/your-feature
```
Then open a Pull Request.
---
23. License
This project was created for learning, experimentation, and portfolio demonstration purposes.
---
24. Author
Vaibhavi Jain
DIT University, Dehradun
GitHub:  
https://github.com/vaibhavij450-tech
---
25. Final Note
Feedback Collector started as a feedback submission application and evolved into a complete full-stack feedback management platform.
The current system supports:
Collect -> Store -> Search -> Own -> Edit -> Delete -> Manage
The planned evolution extends this into:
Collect -> Organize -> Prioritize -> Respond -> Resolve -> Analyze
The architecture is designed to support future additions such as customer accounts, cross-device access, notifications, analytics, role-based access control, automated testing, CI/CD, and AI-powered feedback analysis.
