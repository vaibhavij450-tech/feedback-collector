# Feedback Collector

A full-stack feedback management platform where customers can submit and manage their feedback, while administrators can securely review and manage all responses.

**Tech Stack:** React, Node.js, Express.js, MongoDB, REST API, Vercel, Render

## Live Demo

- **Customer:** [https://feedback-collector-liart.vercel.app](https://feedback-collector-liart.vercel.app)
- **Admin:** [https://feedback-collector-liart.vercel.app/admin/login](https://feedback-collector-liart.vercel.app/admin/login)

## Features

### Customer

- Submit feedback with name, email, and message
- View all submitted feedback
- Search feedback by name, email, or message
- Filter feedback by date
- Edit feedback created in the current browser
- Delete owned feedback with confirmation
- Responsive desktop and mobile interface

### Admin

- Secure admin login
- Protected admin dashboard
- View all customer feedback
- Search and filter feedback
- Delete feedback
- Separate admin and customer permissions

## Architecture

**React Frontend**  
Handles the user interface, forms, routing, feedback display, search, filtering, and customer interactions.

**Express Backend**  
Provides REST APIs for feedback and authentication, along with validation and authorization.

**MongoDB**  
Stores feedback data and ownership information securely.

Customer and admin workflows use the same backend with different access permissions.

## Customer Ownership

Each submitted feedback receives a browser-specific ownership token. The token is stored in an HTTP-only cookie, while its hashed value is stored in MongoDB.

When a customer attempts to edit or delete feedback, the backend verifies the ownership token before performing the operation.

Because ownership is currently browser-based, feedback cannot automatically be managed from another browser or device. An account-based ownership system is planned for a future version.

## Project Structure

```text
feedback-collector/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── App.css
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

## Future Scope

- Customer accounts and cross-device access
- Feedback status, categories, and priorities
- Admin-customer communication
- Analytics and notifications
- Advanced search and pagination
- Role-based access and audit logs
- Automated testing and CI/CD

## Author

**Vaibhavi Jain**  
DIT University, Dehradun
