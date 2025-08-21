# Contact Management App - Docker Setup

This guide explains how to run the Contact Management App using Docker.

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd contact-management-app
   ```

2. **Build and run all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Services Overview

### 1. MongoDB Database
- **Image**: mongo:7.0
- **Port**: 27017
- **Credentials**: 
  - Username: admin
  - Password: password123
  - Database: contactdb

### 2. Backend API (Node.js/Express)
- **Port**: 5000
- **Features**: 
  - User authentication
  - Contact management
  - JWT token handling
- **Database**: Connects to MongoDB

### 3. Frontend (React/Vite)
- **Port**: 5173
- **Features**:
  - Modern React application
  - Served via Nginx
  - API proxy configuration

## Docker Commands

### Start Services
```bash
# Start all services in detached mode
docker-compose up -d

# Start with rebuild
docker-compose up --build

# Start specific service
docker-compose up backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f
```

### Manage Containers
```bash
# List running containers
docker ps

# Execute commands in running containers
docker exec -it contact-app-backend sh
docker exec -it contact-app-mongodb mongosh

# Restart services
docker-compose restart
```

## Development Workflow

### For Backend Development
1. The backend code is mounted as a volume, so changes are reflected immediately
2. You may need to restart the container for some changes:
   ```bash
   docker-compose restart backend
   ```

### For Frontend Development
1. For development, you might want to run the frontend outside Docker:
   ```bash
   cd mycontacts-frontend
   npm install
   npm run dev
   ```
2. Update the API calls to point to `http://localhost:5000`

## Environment Variables

The application uses the following environment variables:

### Backend (.env file in mycontacts-backend/)
```env
CONNECTION_STRING=mongodb://admin:password123@mongodb:27017/contactdb?authSource=admin
NODE_ENV=production
PORT=5000
```

### Frontend
- API calls are configured to use the backend service
- CORS is configured to allow requests from the frontend

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's using the port
   netstat -ano | findstr :5000
   # Kill the process or change the port in docker-compose.yml
   ```

2. **MongoDB connection issues**:
   ```bash
   # Check if MongoDB is running
   docker-compose logs mongodb
   # Ensure the connection string is correct
   ```

3. **Frontend not loading**:
   ```bash
   # Check frontend logs
   docker-compose logs frontend
   # Ensure nginx configuration is correct
   ```

4. **Permission issues** (Linux/Mac):
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Reset Everything
```bash
# Stop and remove everything
docker-compose down -v
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Production Deployment

For production deployment:

1. **Update environment variables**:
   - Use strong passwords for MongoDB
   - Set proper JWT secrets
   - Configure HTTPS

2. **Security considerations**:
   - Don't expose MongoDB port publicly
   - Use environment files for secrets
   - Configure proper CORS settings

3. **Scaling**:
   - Use Docker Swarm or Kubernetes for orchestration
   - Set up proper load balancing
   - Configure health checks

## File Structure

```
contact-management-app/
├── docker-compose.yml          # Main orchestration file
├── .dockerignore              # Files to exclude from Docker builds
├── mycontacts-backend/
│   ├── Dockerfile             # Backend container configuration
│   └── ...
├── mycontacts-frontend/
│   ├── Dockerfile             # Frontend container configuration
│   ├── nginx.conf             # Nginx configuration
│   └── ...
└── README-Docker.md           # This file
```

## Support

If you encounter any issues:
1. Check the logs: `docker-compose logs`
2. Ensure all prerequisites are installed
3. Verify network connectivity between containers
4. Check file permissions and ownership
