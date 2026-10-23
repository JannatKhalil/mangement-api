Markdown
# Task Management REST API

A robust RESTful API built with Node.js, Express, PostgreSQL, and JWT Authentication for managing user tasks efficiently.

## 🚀 Features

- **User Authentication**: Secure Registration and Login using JWT (JSON Web Tokens).
- **Task Management**: Full CRUD capabilities to Create, Read, Update, and Delete tasks.
- **Dashboard Analytics**: Retrieve task metrics (Total, Completed, Pending tasks).
- **Security**: Protected routes requiring Bearer Token authentication.

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT) & bcrypt (for password hashing)
- **API Testing**: Postman

---

## 📋 API Endpoints

### 🔑 Authentication Routes
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate user & get token | No |

### 📝 Task Routes
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task | Yes (Bearer Token) |
| `GET` | `/api/tasks` | Fetch all tasks for logged-in user | Yes (Bearer Token) |

### 📊 Dashboard Routes
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Fetch summary and task analytics | Yes (Bearer Token) |

---

## ⚙️ Setup & Installation Instructions

1. **Clone the Repository**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd task-management-api
Install Dependencies

Bash
npm install
Environment Variables Configuration
Create a .env file in the root directory and add:

Code snippet
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
Run the Server

Bash
npm start
# or for development mode:
npm run dev
🧪 Testing with Postman
A pre-configured Postman Collection file (postman_collection.json) is included in the project repository. You can import this file into Postman to test all available endpoints directly.