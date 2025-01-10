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
## API Endpoints

- ### Register User

  ```java
   @route POST /api/v1/auth/register/user
   @desc Register New User
   @param {String} fullname
   @param {String} mobile
   @param {String} email
   @param {String} password
   @returns {Object} User
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Login User

  ```java
   @route POST /api/v1/auth/login
   @desc Login User
   @param {String} email
   @param {String} password
   @param {String} userType
   @returns {Object} {String} accessToken, {String} refreshToken
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Register Driver

  ```java
   @route POST /api/v1/auth/register/driver
   @desc Register new Driver
   @param {String} fullname
   @param {String} email
   @param {String} password
   @param {String} mobile
   @param {double} latitude
   @param {double} longitude
   @param {String} licenseNumber
   @param {String} licenseState
   @param {String} licenseExpirationDate
   @param {String} company
   @param {String} model
   @param {String} color
   @param {int} year
   @param {String} licensePlate
   @param {int} capacity
   @returns {Object} Driver
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

- ### Login Driver

  ```java
   @route POST /api/v1/auth/login
   @desc Login Driver
   @param {String} email
   @param {String} password
   @param {String} userType
   @returns {StatusCode} 200 - OK
   @returns {StatusCode} 400 - Bad Request
   @returns {StatusCode} 404 - Not Found
  ```

- ### Book Ride

  ```java
   @route POST /api/v1/ride/request
   @desc Book Ride
   @header {Authorization} jwtToken
   @param {String} pickupArea
   @param {String} destinationArea
   @param {double} pickupLatitude
   @param {double} pickupLongitude
   @param {double} destinationLatitude
   @param {double} destinationLongitude
   @returns {Object} Ride
   @returns {StatusCode} 201 - Created
   @returns {StatusCode} 400 - Bad Request
  ```

## Responses

- ### Success Responses

  - <b>Login User/Driver (Success)</b>

    ```json
    {
      "statusCode": 200,
      "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGdtYWlsLmNvbSIsImlhdCI6MTcxMDY3MjMyMSwiZXhwIjoxNzExNTcyMzIxfQ.LIc-mqKb1-RRsl4W4l4emn0GDfpSXDY1Wy6NfS9-7dY",
      "refreshToken": "dfkjngfngn4gh5nf4z5hg4z5n5hg4xnx",
      "message": "Got All Data Successfuly",
      "success": true
    }
    ```

- ### Error Responses

  ```json
  {
    "statusCode": 400,
    "message": "All fields are required",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 404,
    "message": "Resource Not Found with given Id",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 401,
    "message": "You need to be logged in first in order to perform this action",
    "errors": [],
    "success": false
  }
  ```

  ```json
  {
    "statusCode": 501,
    "message": "Internal Server Error",
    "errors": [],
    "success": false
  }
  ```

<!-- - ## Postman Collection

  - ### [Postman Collection Link](https://restless-moon-499399.postman.co/workspace/New-Team-Workspace~c7722ba8-7049-40b0-97c9-e367daa05b43/collection/23880545-2625be57-f365-488a-934e-4d7a9fe64389?action=share&creator=23880545)   -->


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

