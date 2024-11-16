# Running Trainings API

This is a RESTful API for managing running trainings, including user authentication, run records management, image uploads, and integration with Swagger for API documentation.

---

## 🚀 Features

### User Management
- User registration, login, and logout.
- User profile management.
- Password hashing and JWT authentication for secure user sessions.

### Run Records
- Create, update, read, and delete running records for authenticated users.
- Weekly aggregated reports for running performance.

### Image Management
- Upload one or multiple images for authenticated users.
- Retrieve a list of uploaded images with accessible URLs.
- Save images locally in the `uploads` folder and store metadata in MongoDB.

### Swagger Integration
- API documentation using Swagger.
- Accessible at `/api-docs`.

---

## 🛠 Prerequisites

- **Node.js** (v16 or higher)  
- **MongoDB**  
- **Git**

---

## 📦 Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/AndreichukVladlena/running-trainings-api.git
   cd running-trainings-api
2. **Install dependencies**:  
   ```bash
   npm install
3. **Environment settings**:
   Create a .env file in the root directory and configure the following variables:
   ```bash
   MONGO_URL=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
4. **Run the server**:
   ```bash
   npm start

---

## 📚 API Endpoints

### Authentication
- **POST /api/user/register** - Register a new user.
- **POST /api/user/login** - Login and receive a JWT token.
- **GET /api/user/profile** - View the authenticated user's profile.
- **POST /api/user/logout** - Logout the current user.
- **GET /api/user/:id** - Get details of a specific user by ID.
- **PUT /api/user/:id** - Update a specific user's information by ID.
- **DELETE /api/user/:id** - Delete a user by ID.

### Run Records
- **POST /api/runRecords** - Add a new running record.
- **GET /api/runRecords** - Get all running records of the authenticated user.
- **PUT /api/runRecords/:id** - Update a specific running record.
- **DELETE /api/runRecords/:id** - Delete a specific running record.
- **GET /api/runRecords/weekly-report** - Get weekly aggregated report.

### Image Management
- **POST /api/image/upload** - Upload one or more images.
- **GET /api/image** - Retrieve a list of uploaded images.

### Swagger Documentation
- **Access at** `/api-docs`.

---

## 🌐 Deployment

The Running Trainings API is deployed and available on Heroku. You can access it at:

🔗 [Running Trainings API on Heroku](https://running-trainings-api-9c2bdc325ffc.herokuapp.com/)

### API Documentation
The Swagger documentation for the API is accessible at:

🔗 [API Documentation](https://running-trainings-api-9c2bdc325ffc.herokuapp.com/api-docs)

