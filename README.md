# School Management System

A full-stack web application for managing basic school operations including student management, task assignments, and admin authentication. Built with Django REST Framework, React, and PostgreSQL.

## 📋 Project Overview

This is a modern, responsive School Management Mini System that allows administrators to:
- Manage student information
- Assign tasks/homework to students
- Track task completion status
- Secure admin login with JWT authentication

## ✨ Features Implemented

### 1. **Authentication System** 🔐
- ✅ Admin login with username and password
- ✅ JWT token-based authentication (access & refresh tokens)
- ✅ Session persistence (tokens stored in localStorage)
- ✅ Automatic redirect to login for unauthenticated users
- ✅ Logout functionality
- ✅ Welcome message with admin username

### 2. **Student Management** 👥
- ✅ **View Students**: Display all students in a responsive table
- ✅ **Add Students**: Create new student records with Name, Class, Age, Email, Phone
- ✅ **Edit Students**: Update existing student details inline
- ✅ **Delete Students**: Remove students from the system
- ✅ Timestamps: Track when students were added/modified

### 3. **Task/Assignment Management** 📝
- ✅ **Assign Tasks**: Create homework/assignments for students
- ✅ **Mark as Completed**: Update task status
- ✅ **View Tasks**: See all tasks assigned to a specific student
- ✅ **Edit Tasks**: Modify task details
- ✅ **Delete Tasks**: Remove tasks from the system
- ✅ Task tracking with timestamps and due dates

### 4. **Dashboard** 📊
- ✅ Protected dashboard (requires login)
- ✅ Student list view with inline editing
- ✅ Quick access to student tasks
- ✅ Admin user information display
- ✅ Responsive design for different screen sizes

### 5. **Database** 💾
- ✅ PostgreSQL database for persistent data storage
- ✅ Relational model (Tasks linked to Students)
- ✅ Auto-timestamps for audit trail
- ✅ Automatic migrations on startup

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)              │
│                   Port: 5173                             │
│  - Login Page                                            │
│  - Students Dashboard                                    │
│  - Tasks Management                                      │
└────────────┬────────────────────────────────────────────┘
             │ HTTP Requests
             │ REST API
             │
┌────────────▼────────────────────────────────────────────┐
│            Backend (Django REST API)                     │
│                   Port: 8000                             │
│  - Authentication (JWT)                                  │
│  - Student CRUD APIs                                     │
│  - Task CRUD APIs                                        │
└────────────┬────────────────────────────────────────────┘
             │ Database Queries
             │
┌────────────▼────────────────────────────────────────────┐
│          PostgreSQL Database                             │
│                   Port: 5432                             │
│  - Students Table                                        │
│  - Tasks Table                                           │
│  - Users Table                                           │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start with Docker

### Prerequisites
- Docker installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (comes with Docker Desktop)

### 1. Start All Services
From the project root directory, run:

```bash
docker-compose -f docker/docker-compose.yml up
```

This command will automatically:
- ✅ Build the backend Docker image (Python 3.12)
- ✅ Build the frontend Docker image (Node.js 20)
- ✅ Start the PostgreSQL database
- ✅ Run database migrations
- ✅ Create a superuser account (username: `admin`, password: `admin123`)
- ✅ Populate database with 5 dummy students and 5 dummy tasks
- ✅ Start the backend server
- ✅ Start the frontend development server

### 2. Access the Application

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | School Management System UI |
| Backend API | http://localhost:8000 | REST API endpoints |
| Django Admin | http://localhost:8000/admin | Django admin panel |
| Database | localhost:5432 | PostgreSQL database |

### 3. Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📖 Usage Guide

### Managing Students
1. After login, see the **Students List** dashboard
2. **Add Student**: Click "Add Student" button, fill in details, and save
3. **Edit Student**: Click "Edit" next to a student, modify details, and save
4. **Delete Student**: Click "Delete" to remove a student
5. **View Tasks**: Click on a student to see their assigned tasks

### Managing Tasks
1. Click on a student to view their tasks
2. **Add Task**: Click "Add Task", fill in title, description, due date, and save
3. **Edit Task**: Click "Edit", modify details, and save
4. **Mark Complete**: Update the task status from Pending to Completed
5. **Delete Task**: Click "Delete" to remove a task

## 🛑 Stop the Application

### Stop all containers (data persists)
```bash
docker-compose -f docker/docker-compose.yml down
```

### Stop and remove all data
```bash
docker-compose -f docker/docker-compose.yml down -v
```

## 🔄 Rebuild After Code Changes

```bash
docker-compose -f docker/docker-compose.yml up --build
```

## 📊 Automatic Dummy Data

The app creates sample data on first run:

### 5 Students
- Student One (Class 10A, Age 15)
- Student Two (Class 10B, Age 15)
- Student Three (Class 10A, Age 16)
- Student Four (Class 10C, Age 15)
- Student Five (Class 10B, Age 16)

### 5 Tasks (One per Student)
- Mathematics Assignment (Pending)
- English Essay (Pending)
- Science Project (Completed)
- History Assignment (Pending)
- Computer Practical (Pending)

## 🏗️ Project Structure

```
school-management-system/
├── backend/                          # Django REST API
│   ├── config/                       # Django configuration
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── students/                     # Student management app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── migrations/
│   ├── tasks/                        # Task management app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── migrations/
│   ├── accounts/                     # Authentication
│   │   ├── views.py
│   │   └── models.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── StudentsPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── components/
│   │   │   ├── StudentTable.jsx
│   │   │   └── TaskTable.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useStudents.js
│   │   │   └── useTasks.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker/
│   └── docker-compose.yml
├── DOCKER_SETUP.md
└── README.md
```

## 🔧 Technologies Used

**Backend:**
- Python 3.12
- Django 6.0.4
- Django REST Framework
- djangorestframework-simplejwt (JWT Authentication)
- PostgreSQL 16
- Gunicorn (production ready)

**Frontend:**
- React 18
- Vite
- React Router DOM
- Fetch API

**DevOps:**
- Docker
- Docker Compose
- PostgreSQL

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Secure password hashing with Django
- ✅ CORS configuration for frontend-backend communication
- ✅ Permission-based access control
- ✅ Superuser role for admin access
- ✅ CSRF protection

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login/` - Admin login (returns access & refresh tokens)
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Students
- `GET /api/students/` - List all students
- `POST /api/students/` - Create new student
- `GET /api/students/{id}/` - Get student details
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student

### Tasks
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `GET /api/tasks/{id}/` - Get task details
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

## 🐛 Troubleshooting

### Port already in use
If a port is already in use, modify `docker/docker-compose.yml`:
```yaml
services:
  backend:
    ports:
      - "8001:8000"  # Changed from 8000:8000
```

### Database connection error
```bash
docker-compose -f docker/docker-compose.yml ps
```
Check if all services are running. Restart if needed.

### Frontend can't reach backend
Ensure both services are running and check the browser console for network errors.

### Rebuild without cache
```bash
docker-compose -f docker/docker-compose.yml build --no-cache
docker-compose -f docker/docker-compose.yml up
```

## 📚 For More Details

See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed Docker troubleshooting, logs, and development workflow.

## 🤝 Contributing

This project is part of the Internshala Gridaan OpenSource initiative.

## 📄 License

This project is open source.

## 👨‍💻 Project Features

This School Management System demonstrates:
- Full-stack web development with Django and React
- RESTful API design
- JWT authentication and authorization
- Database modeling and relationships
- Docker containerization
- Responsive UI/UX design
- CRUD operations
- Real-time data management
