# Feedback Collector

A full-stack feedback management platform where customers can submit and manage their feedback, while administrators can securely review and manage all responses.

**Tech Stack:** React, Node.js, Express.js, MongoDB, REST API, Vercel, Render

## Live Demo

- **Customer:** [https://feedback-collector-liart.vercel.app](https://feedback-collector-liart.vercel.app)
- **Admin:** [https://feedback-collector-liart.vercel.app/admin/login](https://feedback-collector-liart.vercel.app/admin/login)


## Features

### Customer

- Submit feedback with name, email, and message
- Search and filter feedback
- Edit and delete feedback created in the current browser
- Delete confirmation
- Responsive desktop and mobile UI

### Admin

- Secure admin login
- Protected dashboard
- View, search, filter, and delete feedback
- Separate admin and customer permissions

## Architecture

**React Frontend**  
Forms, UI, routing, search and filters

**Express Backend**  
REST API, validation, authentication and authorization

**MongoDB**  
Persistent feedback storage

Customer and admin workflows use the same backend with different access permissions.

## Customer Ownership

Each submitted feedback receives a browser-specific ownership token. The token is stored in an HTTP-only cookie, while its hashed value is stored in MongoDB. The backend verifies this token before allowing edit or delete operations.

Because ownership is browser-based, feedback is not automatically editable from another browser or device. An account-based ownership system is planned for a future version.

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
