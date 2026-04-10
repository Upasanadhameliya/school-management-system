# School Management System - Docker Setup

This guide explains how to run the entire School Management System (frontend, backend, and database) using Docker and Docker Compose.

## Prerequisites

- Docker installed (https://www.docker.com/products/docker-desktop)
- Docker Compose installed (comes with Docker Desktop)

## Quick Start

### 1. Start all services

From the root directory of the project, run:

```bash
docker-compose -f docker/docker-compose.yml up
```

This command will:
- ✅ Build the backend Docker image
- ✅ Build the frontend Docker image
- ✅ Start the PostgreSQL database
- ✅ Run database migrations
- ✅ Create a superuser (username: `admin`, password: `admin123`)
- ✅ Populate the database with 5 dummy students and 5 dummy tasks
- ✅ Start the backend server
- ✅ Start the frontend development server

### 2. Access the Application

Once all services are running, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin (use credentials: admin / admin123)
- **Database**: localhost:5432

### 3. Login to the Application

Use the following credentials to login to the School Management System:

- **Username**: `admin`
- **Password**: `admin123`

## Services and Ports

| Service  | Port | Description |
|----------|------|-------------|
| Frontend | 5173 | React Vite development server |
| Backend  | 8000 | Django REST API server |
| Database | 5432 | PostgreSQL database |

## Dummy Data

The application automatically creates:

- **5 Students**: Student One through Student Five, distributed across classes 10A, 10B, and 10C
- **5 Tasks**: Each student has one task assigned with different due dates and statuses
  - 4 pending tasks
  - 1 completed task

## Stop the Services

To stop all running containers:

```bash
docker-compose -f docker/docker-compose.yml down
```

To stop and remove all data (including the database):

```bash
docker-compose -f docker/docker-compose.yml down -v
```

## Rebuild Services

If you make changes to the backend or frontend code and want to rebuild the Docker images:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

## View Logs

To view logs from all services:

```bash
docker-compose -f docker/docker-compose.yml logs -f
```

To view logs from a specific service:

```bash
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml logs -f frontend
docker-compose -f docker/docker-compose.yml logs -f db
```

## Accessing Services from Docker

When services are running in Docker:
- Backend service is accessible at: `http://backend:8000` (from within the Docker network)
- Database is accessible at: `db:5432` (from within the Docker network)
- Frontend service is accessible at: `http://frontend:5173` (from within the Docker network)

## Environment Variables

The Docker setup uses the following environment variables (defined in `docker-compose.yml`):

### Database
- `POSTGRES_DB`: Database name (default: school_management)
- `POSTGRES_USER`: Database user (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: postgres123)

### Django Backend
- `DEBUG`: Debug mode (default: True)
- `SECRET_KEY`: Django secret key for production, change this!
- `DATABASE_NAME`: Database name
- `DATABASE_USER`: Database user
- `DATABASE_PASSWORD`: Database password
- `DATABASE_HOST`: Database hostname (should be `db` when in Docker)
- `DATABASE_PORT`: Database port (default: 5432)

## Troubleshooting

### "Can't connect to database" error

Make sure the database service is healthy:

```bash
docker-compose -f docker/docker-compose.yml ps
```

If the database is not running, restart the services:

```bash
docker-compose -f docker/docker-compose.yml up
```

### Frontend can't reach the backend

Ensure both services are running and check the browser's Network tab in Developer Tools to see the API requests.

### Port already in use

If a port is already in use on your system, you can modify the port mapping in `docker/docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:8000"  # Changed from 8000:8000
```

### Rebuild without cache

```bash
docker-compose -f docker/docker-compose.yml build --no-cache
docker-compose -f docker/docker-compose.yml up
```

## Development Workflow

The Docker setup includes volume mounts for both backend and frontend:

- **Backend changes**: Changes to Python files will require container restart
- **Frontend changes**: Changes to JavaScript/JSX files will hot-reload due to Vite's development server

To restart a specific service:

```bash
docker-compose -f docker/docker-compose.yml restart backend
```

## Next Steps

1. Access the frontend at http://localhost:5173
2. Login with admin credentials (admin / admin123)
3. View the students list and their tasks
4. Perform CRUD operations on students and tasks
