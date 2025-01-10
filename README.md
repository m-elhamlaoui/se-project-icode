# Morocco Drive

## Overview
Morocco Drive is a cab booking application designed to provide users with a seamless and efficient way to book rides by specifying pickup and destination locations. The system is developed using modern technologies to ensure performance, scalability, and a user-friendly interface.

## Objectives
- Provide users with an intuitive platform for booking cabs.
- Enable drivers to manage rides effectively.
- Leverage modern web technologies for optimal performance and scalability.

## Tech Stack

### Backend
- **Languages & Frameworks**: Java, Spring Boot, Spring Security, Spring Data JPA
- **Authentication**: JWT Authentication
- **Database**: MySQL
- **Testing**: Postman, JUnit, Mockito, TestContainers, RestAssured
- **Containerization**: Docker

### Frontend
- **Frameworks**: ReactJS, Next.js (v14)
- **Styling**: TailwindCSS, Material UI
- **State Management**: Redux Toolkit
- **Languages**: TypeScript

## System Architecture
The application is divided into two main modules:
1. **Backend Module**: Handles APIs, authentication, database management, and business logic.
2. **Frontend Module**: Manages the user interface, client-side logic, and communication with the backend.

## Installation and Setup

### Prerequisites
- Java Development Kit (JDK) 17+
- Node.js
- Git
- MySQL Client
- Docker
- IDEs: IntelliJ IDEA, Spring Tool Suite (STS), Eclipse, NetBeans, Visual Studio Code

### Steps to Run

#### Clone Repository
```bash
https://github.com/m-elhamlaoui/se-project-icode
```

#### Backend Setup
1. Navigate to the backend directory.
2. Update the `application.yml` file with your MySQL credentials and server configuration.
3. Start the server:
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd morroco-drive-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the proxy configuration in `next.config.mjs` to route API requests to the backend.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Key Features

### API Endpoints

#### User Management
- Register User
- Login User

#### Driver Management
- Register Driver
- Login Driver

#### Ride Management
- Book Ride
- Accept Ride
- Complete Ride

### Success Responses
- Example for User Login:
  ```json
  {
    "message": "Login successful",
    "token": "..."
  }
  ```

### Error Responses
- Missing Fields
- Unauthorized Access

## Snapshots
1. **Authentication Page**
2. **User Login/Register Page**
3. **Ride Booking Page** (Enter pickup and destination)
4. **Driver Login Page**
5. **Driver Dashboard** (Available rides listed)
6. **OTP Verification** (Driver enters OTP to start the ride)

## Conclusion
Morocco Drive showcases the use of modern web development technologies to solve real-world transportation challenges. The project adheres to best practices in API design, authentication, state management, and responsive UI development, making it a robust solution for cab booking and management.

## Authors
- Zyad Fri
- Yassir Bousseta
- Jaafar Yeffou
- Samia Lachgar

## Instructor
- EL HAMLAOUI Mahmoud

