# CoffeeCraze Project Technical Documentation



**Version:** 1.0-2.0

**Last Updated:** 24 February 2025

# 1. Overview
**CoffeeCraze** (branded as _R Royal_) is a modern, performant, and scalable web application engineered as a coffee-focused e-commerce platform. The front-end leverages **Vite** and **React** to deliver a responsive, Single-Page Application (SPA) experience, while the back-end provides robust API services, secure authentication, and seamless integrations with third-party systems such as payment gateways and email services.

A cornerstone of the platform’s security is its implementation of **Role-Based Access Control (RBAC)**, which cleanly delineates user and admin functionalities. This ensures that permissions are role-specific, enhancing both security and usability. The system integrates modern front-end technologies with a meticulously architected back-end, offering developers a clear, maintainable, and extensible codebase.

### Key Features
- **Front-End:** Fast, modular SPA built with Vite + React, featuring component-based design, state management via Context API, and optimized performance.
- **Back-End:** Node.js and Express-powered API with MongoDB persistence, JWT authentication, and integrations with Razorpay, Cloudinary, and Nodemailer.
- **Security:** RBAC, short-lived JWTs with refresh tokens, rate limiting, and defense-in-depth practices.
- **Purpose:** Provide an efficient e-commerce solution for coffee enthusiasts with a focus on scalability and developer experience.
This documentation outlines the system’s architecture, setup instructions, API design, security considerations, and planned enhancements, serving as a comprehensive guide for developers and maintainers.

# 2. Architecture Overview
### Front-End Architecture
![diagram-export-2-25-2025-12_20_58-PM.png](https://eraser.imgix.net/workspaces/9BuIrblKa2PK0U7z6coO/sNKAvlg5WWR44Cb2XY2EZwF5eMl2/BM_dUzsTDZwssZddH0MSr.png?ixlib=js-3.7.0 "diagram-export-2-25-2025-12_20_58-PM.png")

## 2.1. Project Structure
CoffeeCraze is a Single-Page Application (SPA) developed using **Vite** and **React**, adhering to a modular and scalable architecture. The project is organized into a clear directory structure to enhance maintainability and ease of navigation.

### Directory Breakdown
- `**public/**` 
    - Contains static assets such as images and fonts, served directly by Vite.
- `**src/**` 
    - The core source code directory, structured as follows:
        - `**components/**` 
            - Reusable React components:
                - `**admin/**`: Admin-specific components, including` adminCart.jsx`, `adminProfile.jsx`, and `Dashboard.jsx.` 
                - General components such as `Deliver.jsx`,` Discovery.jsx`,` FlavSection.jsx`, `Foot.jsx`,` Nav.jsx`, `paynow.jsx`, `shortStore.jsx`, and `TwoCards.jsx`.
                - _Note_: `protectedRoute.jsx` is deprecated and should not be used in new development.
        - `**config/**` 
            - Configuration files:
                - `baseURL.js`: Defines global declarations, such as the API base URL.
                - `staticData.js` and `user.js`: Provide static mock data for development and testing purposes.
        - `**pages/**` 
            - Page-level components corresponding to application routes, including:
                - `Aboutus.jsx`, `CartCollection.jsx`,` Collection.jsx`, `LandingPage.jsx`, `Login.jsx`,` PaymentSuccess.jsx`, `Profile.jsx`, `ShopCollection.jsx`, and `Signup.jsx`.
        - `**profile/**` 
            - Contains components related to admin profile access.
        - `**shimmerUI/**` 
            - Placeholder (shimmer) components for loading states, such as `ProfileShimmer.jsx`, `CartShimmer.jsx`, and `ShopShimmer.jsx`.
        - `**contextAPI/**` 
            - Manages global state using React Context:
                - `Auth.js`  and `AuthProvider.jsx`: Handle authentication state (e.g., isLoggedin, Logout, role).
                - _Note_: BuyItem.js and BuyItemCP.jsx are deprecated as of UI v2.0.
        - `**App.jsx**``, **index.css**`,` **main.jsx** ` 
            - Serve as the application’s entry point, global styling, and rendering logic.
- **Configuration Files**
    - `.env`: Manages environment variables.
    - `vite.config.js`: Configures Vite for build and development settings.
    - `eslint.config.js`: Enforces code quality through linting rules.
## 2.2. Design & Development Paradigm
### 2.1 Component-Based Architecture
- The frontend is developed using **React’s component-based architecture**, emphasizing:
    - Modularity and reusability.
    - Separation of concerns.
- Each component is designed to be self-contained, facilitating easier maintenance and extension of the codebase.
### 2.2.2 Routing
- Navigation is managed using **React Router**, utilizing components such as:
    - `BrowserRouter`, `Routes`, `Route`, and` Link` for seamless client-side routing.
- Native JavaScript routing (e.g., `window.location.href`) is used to manage initial page load positioning.
### 2.2.3 State & Authentication Management
- Global state management is facilitated through **React’s Context API**:
    - The **Auth context** provides essential authentication-related values, including `isLoggedin`, `Logout`, and `role`.
- **Role-Based Access Control (RBAC)** is implemented using **JWT tokens**:
    - Upon login, the server issues a JWT (expiring in 1 minute) containing the user’s ID, name, and role.
    - A refresh token (stored as an `httpOnly cookie,` expiring in 7 days) ensures secure, role-specific access and token renewal.
    - This setup differentiates between regular customers and admin users, enabling tailored experiences based on user roles.
### 2.2.4 API Integration & Error Handling
- **Axios** is the primary library for making API requests, with some legacy usage of the **Fetch API**.
- Global **Axios interceptors** are employed to:
    - Manage response errors.
    - Implement refresh token logic.
    - Retry failed API calls using `try-catch` blocks for robust error handling.
### 2.2.5 Performance Optimizations
- **Lazy Loading & Code Splitting**:
    - Components are lazy-loaded to minimize initial bundle size and improve load times.
- **Vite Optimizations**:
    - Leveraging Vite’s **SWC engine**, the project benefits from faster build times and optimized production builds.
### 2.2.6 Styling & Animations
- **CSS Modules** and **Tailwind CSS** are used for styling, ensuring:
    - Scoped and utility-first approaches.
- **Framer Motion** provides smooth animations, particularly on the landing page.
- **Google Fonts** are integrated for consistent typography across the application.
### 2.2.7 Testing
- The **React Testing Library** is utilized for component testing, ensuring reliability and correctness.
- Developer tools are in place for debugging and moderate testing, aligning with Minimum Viable Product (MVP) requirements.
### 2.2.8 Tooling & Build Process
- The project was initialized using `npm create vite@latest` with the React template.
- It is a JavaScript-only project (no TypeScript), prioritizing a lightweight development experience.
### 2.2.9 Responsiveness & Accessibility
- The application is designed to be **responsive** across various screen sizes, with a focus on optimal performance on larger screens.
- Accessibility best practices are considered to ensure an inclusive user experience.
# 3. Backend Architecture
This backend system is built using Node.js and Express for an e-commerce application. It manages user authentication, product management, cart operations, order processing, and payment integration. The design emphasizes modularity, maintainability, and security by following industry best practices. The system leverages MongoDB via Mongoose for data persistence and integrates with Razorpay, Cloudinary, and Nodemailer for payment processing, media management, and transactional emails, respectively.



![diagram-export-2-25-2025-1_21_35-PM.png](https://eraser.imgix.net/workspaces/9BuIrblKa2PK0U7z6coO/sNKAvlg5WWR44Cb2XY2EZwF5eMl2/OSANf3jVD7bdwuKHkU_oC.png?ixlib=js-3.7.0 "diagram-export-2-25-2025-1_21_35-PM.png")

---

## 3.1 System Overview
- **Core Technologies:**
    - **Server Framework:** Node.js with Express.
    - **Database:** MongoDB, accessed through Mongoose.
    - **Authentication:** JWT-based, with both short-lived access tokens and refresh tokens.
    - **Third-Party Integrations:** Razorpay (payments), Cloudinary (image uploads), and Nodemailer (email services).
    - **Deployment:** Render free website hosting, with deployments triggered via Git commits (manual control).
- **Key Architectural Goals:**
    - **Modularity:** Clear separation of concerns by dividing the system into routes, middleware, services, and models.
    - **Security:** Implements JWT authentication, secure cookie management, rate limiting, and role-based access control (RBAC).
    - **Scalability:** Clean code separation and modular design to facilitate future enhancements and scaling.
    - **Maintainability:** Consistent naming conventions (all lowercase, meaningful names) and a clear folder structure to ensure ease of navigation and modifications.
---

## 3.2 High-Level Architecture
### 3.2.1 Application Layers
1. **API Layer (Express Routes):**
    - **Authentication Routes:** Endpoints for login, signup, token refresh, and logout.
    - **Admin Routes:** Endpoints to manage orders (e.g., order list, update shipping status) with RBAC enforcement.
    - **Cart Routes:** CRUD operations for user carts.
    - **Product Routes:** Fetch product details and handle image uploads.
    - **Payment Routes:** Create orders, verify payments, and handle payment confirmations using Razorpay.
2. **Middleware Layer:**
    - **JWT Extraction & User Extraction:** Middleware that extracts the JWT from the `Authorization`  header, verifies it, and attaches user details (ID, username, role) to the request.
    - **Rate Limiting:** Uses `express-rate-limit`  to cap each IP to 100 requests per 15 minutes.
    - **Logging:** Utilizes Morgan to log all HTTP requests for debugging and monitoring.
    - **Environment & Secrets Management:** Stores sensitive credentials (JWT secret, Razorpay keys, Cloudinary credentials, email credentials) in environment variables managed via `dotenv` .
3. **Service Layer:**
    - **Email Service:** Utilizes Nodemailer to send welcome emails and payment confirmations.
    - **Cloudinary Integration:** Handles product image uploads.
    - **Payment Integration:** Manages order creation and verification through Razorpay.
4. **Database Layer:**
    - **Mongoose Models:**
        - **User Model:** Stores user profile data, authentication details (hashed passwords, last login, OTP information), orders, cart items, and addresses.
        - **Product Model:** Contains product metadata, pricing, descriptions, keywords, available sizes, image URLs, and additional content like stories and video URLs.
    - **Indexing:** Applies smart indexing strategies with precise field naming (e.g., unique index on the email field) to optimize query performance and ensure fast retrieval.
---

## 3.3 Detailed Components
### 3.3.1 Middleware & Security
#### JWT & User Extraction
- **Flow:**
Incoming requests pass through middleware that:
﻿﻿Code Example: 

```

const jwt = require("jsonwebtoken");
require("dotenv").config();

const userExtractor = (req, res, next) => {
  const token = req.token;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decodedUser = jwt.verify(token, secretKey);
    req.id = decodedUser.id;
    req.username = decodedUser.username;
    req.role = decodedUser.role;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "JWT token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = userExtractor;
```
1. **Extracts** the JWT token from the `Authorization`  header.
2. **Verifies** the token using a secret key from environment variables.
3. **Attaches** user details (ID, username, role) to the request object for further use.
- **Error Handling:**
Returns clear error messages for missing, invalid, or expired tokens.
#### Rate Limiting
**Implementation:**

```

Uses express-rate-limit  with the following configuration
const rateLimit = require('express-rate-limit');

// middleware/rateLimiter.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

module.exports = limiter;

//user of middleware
app.use(limiter)
```


- **Application:**
This middleware is integrated globally in the main Express app to protect all endpoints from abuse.
#### Logging & Environment Management
- **Logging:**
Morgan is used to log HTTP requests, which aids in real-time monitoring and debugging.
- **Environment & Secrets Management:**
All sensitive credentials are stored in environment variables (via `dotenv` ), ensuring that secrets are not exposed in the codebase.
---

### 3.3.2 Routing and Module Organization
- **Authentication (authRouter):**
    - **Endpoints:** `/login` , `/signup` , `/refresh` , `/logout` 
    - **Flow:** Validates user credentials, issues short-lived JWT tokens, and sets refresh tokens as secure HTTP-only cookies.
- **Admin (adminRouter):**
    - **Endpoints:** `/order-list` , `/order/shipped` , `/order/:id/ship` 
    - **Security:** Enforces that only users with the admin role can access these endpoints.
- **Cart Management (cartRouter):**
    - **Endpoints:** Multiple routes for adding, removing, and retrieving cart items.
    - **Operations:** Uses MongoDB operators like `$addToSet`  and `$pull`  to manage cart content efficiently.
- **Product Management (productRouter):**
    - **Endpoints:** Fetch all products, product details, and upload new products.
    - **Media Handling:** Integrates Cloudinary to handle image uploads via streaming.
- **Payment Processing (payRouter):**
    - **Endpoints:** `/create-order` , `/verify-payment` , `/payment-success` 
    - **Flow:**
        1. **Order Creation:** Initiates a payment order using Razorpay.
        2. **Payment Verification:** Verifies the authenticity of the payment using signature verification.
        3. **Status Update:** Updates order status in the database and sends transactional emails upon successful payment.
---

### 3.3.3 Database Layer
#### MongoDB with Mongoose
- **Models:**
    - **User Model:**
        - **Profile:** Contains user name, email (unique), phone, role (customer/admin), createdAt, updatedAt.
        - **Auth:** Includes hashed password, last login, OTP details for resets, and account lock status.
        - **Additional Data:** Arrays for orders, cart items, and addresses.
    - **Product Model:**
        - **Core Fields:** itemName, description, price, quantity.
        - **Attributes:** Keywords (array), sizes (array), story, videoUrl.
        - **Images:** image1, image2, image3 (URLs managed via Cloudinary).
        - **Timestamps:** Automatically managed via Mongoose timestamps.
- **Indexing:**
    - **User Model:**
        - Unique index on `profile.email` .
        - Additional compound indexes may be created on frequently queried fields.
    - **Product Model:**
        - Indexes on `itemName` , `keywords` , and `price`  to improve search performance.
---

### 3.3.4 Third-Party Integrations
- **Razorpay (Payment Gateway):**
    - **Purpose:** Handles order creation and payment verification.
    - **Security:** Employs signature verification to ensure payment authenticity.
- **Cloudinary (Image Hosting):**
    - **Purpose:** Manages product image uploads using a streaming API.
    - **Configuration:** Credentials and folder paths are configured in a dedicated module.
- **Nodemailer (Email Service):**
    - **Purpose:** Sends welcome emails and order confirmations.
    - **Usage:** Configured with secure SMTP settings and includes robust error handling for reliable email delivery.
---

### 3.3.5 Deployment Environment
- **Platform:** Render (free website hosting)
- **Deployment Method:**
    - **Process:** Code is pushed to Git, with manual commits triggering deployments.
    - **Control:** This manual process ensures full control over deployment cycles, providing stability in a moderate project setup.
---

## 3.4 Code Structure & Naming Conventions
- **Modular Design:**
Routes, middleware, models, and utilities are organized into distinct folders for clarity.
- **Example Directory Structure:**bashCopyEdit/controllers
  ├── authRouter.js
  ├── adminRouter.js
  ├── cartRouter.js
  ├── productRouter.js
  └── payRouter.js
/middleware
  ├── jwtExtractor.js
  ├── userExtractor.js
  └── rateLimiter.js
/models
  ├── userModel.js
  └── productModel.js
/services
  ├── mailer.js
  ├── orderSuccessTemp.js
  └── signupWelcomeTemp.js
/utils
  └── config.js
index.js
app.js
- **Naming Conventions:**
All file names and variables follow a clear, lowercase, and descriptive naming strategy for consistency and ease of navigation.
---

## 3.5 Security Considerations
- **Authentication & Authorization:**
    - **JWT Authentication:** Uses short-lived tokens for API access.
    - **Refresh Token Safeguards:**
        - Stored as HTTP-only cookies to protect against XSS.
        - Configured with `SameSite=Strict`  to prevent CSRF attacks.
        - A 7-day expiry with daily rotation to minimize risk.
    - **RBAC Enforcement:**
        - Middleware ensures that only authorized roles can access sensitive endpoints.
- **Rate Limiting:**
    - Limits each IP to 100 requests per 15 minutes to prevent brute-force attacks and DoS scenarios.
- **Data Validation:**
    - Input validation is applied to key endpoints to prevent injection attacks and ensure data integrity.
- **Sensitive Data Management:**
    - All credentials and configuration data are stored in environment variables (via `dotenv` ).
- **Defense-in-Depth Strategy: **
| Layer | Tactics |
| ----- | ----- |
| Network | Rate limiting (100 req/15 min), Helmet headers |
| Data | Mongoose sanitization, bcrypt hashing (12 rounds) |
| Session | HTTP-only cookies with SameSite settings; short-lived JWTs |
| Application | Centralized logging via Morgan; error handling middleware |
> _This comprehensive backend architecture ensures that the CoffeeCraze platform is secure, scalable, and maintainable, meeting the high standards expected at a senior development level. Each layer is designed with a focus on clarity, modularity, and defense-in-depth, providing a robust foundation for current and future enhancements._

---

## 4. Technology Stack
The CoffeeCraze backend is built using a modern, modular technology stack designed for scalability, performance, and maintainability. Below is an overview of the core technologies, integrations, deployment strategies, and environment management tools used in this project:

### Back-End
- **Node.js & Express:**
    - **Node.js** serves as the runtime environment for executing JavaScript on the server-side, providing high performance and scalability.
    - **Express** is used as the web framework to build a robust RESTful API, with its lightweight and flexible middleware system that facilitates modular route handling and middleware integration.
- **MongoDB & Mongoose:**
    - **MongoDB** is chosen for its flexibility and scalability as a NoSQL database, ideal for handling diverse data structures.
    - **Mongoose** acts as the ODM (Object Data Modeling) library, enabling a structured schema design for data persistence, enforcing data validation, and simplifying database interactions through a clear API.
- **JWT (JSON Web Tokens):**
    - JWT is used for stateless authentication, issuing short-lived access tokens and refresh tokens for secure API access.
    - This allows for scalable, secure user sessions without maintaining server-side session storage.
- **Express-rate-limit:**
    - This middleware is integrated to mitigate abuse by limiting the number of requests per IP over a set time window, thereby protecting the API from brute-force and denial-of-service (DoS) attacks.
- **Morgan:**
    - Morgan is employed as the HTTP request logger, providing real-time logging for monitoring, debugging, and performance analysis of incoming requests.
### Integrations
- **Razorpay:**
    - Serves as the payment gateway, handling order creation and payment verification through secure API interactions.
    - Its integration ensures that payments are processed reliably and securely.
- **Cloudinary:**
    - Manages image uploads and storage, providing a seamless and efficient solution for handling media assets.
    - Cloudinary's streaming upload API is utilized to ensure fast and reliable image processing.
- **Nodemailer:**
    - Used to send transactional emails (e.g., welcome emails, order confirmations) through secure SMTP settings.
    - Email templates are dynamically generated to deliver branded, personalized communications to users.
### Deployment
- **Render:**
    - The application is deployed on Render's free website hosting platform, which offers reliable cloud hosting solutions.
    - Deployments are managed manually via Git commits, providing full control over updates and ensuring stable release cycles in a moderate project environment.
### Environment Management
- **dotenv:**
    - Environment variables are managed using the `dotenv`  package, ensuring that all sensitive credentials (such as JWT secrets, API keys, and SMTP details) are securely stored and easily configurable without hard-coding them in the source code.
> _This carefully chosen technology stack allows the CoffeeCraze platform to operate securely, efficiently, and reliably while also being flexible enough to support future enhancements and scaling._

---

# 5. Installation & Setup
Clone the Repository:

```
git clone [﻿github.com/Mr-Prashanth-Chowdary/CoffeeCraze_backend.git](https://github.com/Mr-Prashanth-Chowdary/CoffeeCraze_backend.git) 
```
Install Dependencies:

```
npm install
```
Configure Environment Variables:

Create a `.env`  file in the root directory.

> Add necessary variables (e.g., JWT_SECRET, MONGODB_URI, RAZORPAY keys, CLOUDINARY credentials, EMAIL_USER, EMAIL_PASS).



Run the Application:

```
npm start
```
Deployment:

Push commits to Git to trigger manual deployments on Render.

---

# 6 API Design & Endpoints
## 6..1 Auth Endpoints
### POST /api/auth/login
- **Purpose**: Authenticate a user by validating their credentials and issue a JSON Web Token (JWT) for session management and a refresh token for prolonged access.
- **Request**:
    - **Method**: POST
    - **Path**: /api/auth/login
    - Body (application/json):
```
{
  "emailid": "string", // Required, unique emailid of the user
  "password": "string"  // Required, user's password 
}
```
- **Response**:
    - **Success** (200 OK):
    - Body:
```
{
  "accessToken": "string",  // JWT token, expires in 1 minute
  "refreshToken": "string"  // Refresh token, stored in HTTP-only cookie, expires in 7 days
}
```
- **Headers**:
    - Set-Cookie: refreshToken=<token>; HttpOnly; Secure; SameSite=Strict; path='/'
- Error (401 Unauthorized):
```
{
  "error": "Invalid credentials"
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Missing username or password"
}
```
- **Security Considerations**:
    - Passwords are hashed using bcrypt with a salt factor of 9 before storage.
    - JWT token is signed with a secret key (e.g., HS256 algorithm) and includes payload: { userId, username, role }.
    - Refresh token is stored in an HTTP-only cookie to mitigate XSS attacks, with Secure flag enabled in production for HTTPS-only transmission.
    - Rate limiting applied to prevent brute-force attacks (e.g., 5 attempts per IP per minute).
### POST /api/auth/signup
- **Purpose**: Register a new user in the system, create their account, and send a welcome email.
- **Request**:
    - **Method**: POST
    - **Path**: /api/auth/signup
    - **Body** (application/json):
```
{
  "username": "string",   // Required,3-20 characters 
  "email": "string",      // Required,  unique, valid email format
  "password": "string",   // Required, min 8 characters
  "role": "string"        // Optional, defaults to "user", valid values: ["user", "admin"]
}
```
- **Response**:
    - **Success** (201 Created):
```
{
  "message": "User created successfully",
  "userId": "string"  // Unique identifier for the new user
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Username or email already exists"
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Invalid email format"
}
```
- **Security Considerations**:
    - Passwords are hashed using bcrypt before storage.
    - Input validation ensures username uniqueness and email format compliance.
    - Welcome email sent asynchronously using Nodemailer with a service like SendGrid or SMTP.
    - Rate limiting to prevent abuse (e.g., 10 signups per IP per hour).
### POST /api/auth/refresh
- **Purpose**: Issue a new JWT access token using a valid refresh token, extending the user session without re-authentication.
- **Request**:
    - **Method**: POST
    - **Path**: /api/auth/refresh
    - **Headers**:
```
Cookie: refreshToken=<token> // Refresh token from HTTP-only cookie
```
- **Response**:
    - **Success** (200 OK):
```
{
  "accessToken": "string"  // New JWT token, expires in 1 minute
}
```
- **Error** (401 Unauthorized):
```
{
  "error": "Invalid or expired refresh token"
}
```
- **Security Considerations**:

    - Refresh token is verified against a stored value in the database (e.g., in a RefreshTokens collection).
    - New JWT token issued with updated expiration but same payload.
    - Refresh token remains valid until its 7-day expiry or explicit logout.
    - Secure and HttpOnly cookie flags enforced.
### POST /api/auth/logout
- **Purpose**: Terminate the user session by invalidating the refresh token and clearing the associated cookie.
- **Request**:
    - **Method**: POST
    - **Path**: /api/auth/logout
    - **Headers**:
```
Cookie: refreshToken=<token> // Refresh token to invalidate
```
- **Response**:
    - **Success** (200 OK):
        - **Body**:
```
{
  "message": "Logged out successfully"
}
```
- **Headers**:
```
Clear-Cookie: refreshToken=; HttpOnly; // Clears the cookie
```
- **Error** (400 Bad Request):
```
{
  "error": "No refresh token provided"
}
```
- **Security Considerations**:
    - Refresh token is deleted from the database to prevent reuse.
    - Cookie is cleared by setting Max-Age=0.
    - No JWT token invalidation required due to short expiry (1 minute).
---

## 6.2 Admin Endpoints
### GET /api/admin/order-list
- **Purpose**: Retrieve a comprehensive list of all orders for administrative review and management.
- **Request**:
    - **Method**: GET
    - **Path**: /api/admin/order-list
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Response**:
    - **Success** (200 OK):
```
[
  {
    "orderId": "string",       // Unique order identifier
    "userId": "string",        // User who placed the order
    "items": [
      {
        "productId": "string", // Product identifier
        "quantity": "number"   // Number of units ordered
      }
    ],
    "totalAmount": "number",   // Total cost in currency (e.g., INR)
    "status": "string",        // e.g., "pending", "shipped", "delivered"
    "createdAt": "string"      // ISO 8601 timestamp, e.g., "2023-10-10T12:00:00Z"
  }
]


```
- **Error** (403 Forbidden):
```
{
  "error": "Access denied. Admin role required."
}
```
- **Error** (401 Unauthorized):
```
{
  "error": "Authentication required"
}
```
- **Security Considerations**:
    - Requires admin role, enforced via middleware checking role in JWT payload.
    - JWT token validated for authenticity and expiry.
### GET /api/admin/order/shipped
- **Purpose**: Retrieve a filtered list of orders that have been marked as shipped, for admin tracking.
- **Request**:
    - **Method**: GET
    - **Path**: /api/admin/order/shipped
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Response**:
    - **Success** (200 OK):

```
[
  {
    "orderId": "string",
    "userId": "string",
    "items": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "totalAmount": "number",
    "status": "shipped",
    "shippedAt": "string"  // ISO 8601 timestamp
  }
]
```
- **Error** (403 Forbidden):
```
{
  "error": "Access denied. Admin role required."
}
```
- **Security Considerations**:
    - Admin role enforced via middleware.
    - Response limited to orders with status: "shipped".
### PATCH /api/admin/order/:id/ship
- **Purpose**: Update the status of a specific order to "shipped" by an admin.
- **Request**:
    - **Method**: PATCH
    - **Path**: /api/admin/order/:id/ship
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Params**:
```
id: "string" // Order ID to update
```
- **Response**:
    - **Success** (200 OK):
```
{
  "message": "Order status updated to shipped",
  "orderId": "string",
  "shippedAt": "string"  // ISO 8601 timestamp
}
```
- **Error** (404 Not Found):
```
{
  "error": "Order not found"
}
```
- **Error** (403 Forbidden):
```
{
  "error": "Access denied. Admin role required."
}
```
- **Security Considerations**:
    - Admin role required.
    - Order existence validated before update.
    - shippedAt timestamp added to order record.
---

## 6.3 Cart Endpoints
### GET /api/cart/
- **Purpose**: Retrieve the current authenticated user’s shopping cart contents.
- **Request**:
    - **Method**: GET
    - **Path**: /api/cart/
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Response**:
    - **Success** (200 OK):
```
{
  "cartItems": [
    {
      "productId": "string", // Product identifier
      "quantity": "number",  // Number of units
      "name": "string",      // Product name (optional, for convenience)
      "price": "number"      // Price per unit
    }
  ],
}
```
- **Error** (401 Unauthorized):
```
{
  "error": "Authentication required"
}
```
- **Security Considerations**:
    - Requires valid JWT token, user ID extracted from token payload.
    - Cart data fetched from user-specific record in database.
### POST /api/cart/
- **Purpose**: Add a new item to the cart or update the quantity of an existing item.
- **Request**:
    - **Method**: POST
    - **Path**: /api/cart/
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Body** (application/json):
```
{
  "productId": "string", // Required, valid product ID
  "quantity": "number"   // Required, positive integer
}
```
- **Response**:
    - **Success** (200 OK):
```
{
  "message": "Cart updated successfully",
  "cartItems": [
    {
      "productId": "string",
      "quantity": "number",
      "name": "string",
      "price": "number"
    }
  ],
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Invalid product ID or quantity"
}
```
- **Security Considerations**:
    - JWT token required.
    - Product existence validated before adding to cart.
    - Quantity constrained to positive integers.
### POST /api/cart/remove/:id
- **Purpose**: Remove a specific item from the user’s cart by product ID.
- **Request**:
    - **Method**: POST
    - **Path**: /api/cart/remove/:id
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- **Params**:
```
id: "string" // Product ID to remove
```
- **Response**:
    - **Success** (200 OK):
```
{
  "message": "Item removed from cart",
  "cartItems": [
    {
      "productId": "string",
      "quantity": "number",
      "name": "string",
      "price": "number"
    }
  ],

}
```
- **Error** (404 Not Found):
```
{
  "error": "Item not found in cart"
}
```
- **Security Considerations**:
    - JWT token required.
    - Ensures item exists in user’s cart before removal.
---

## 6.4 Product Endpoints
### GET /api/products/
- **Purpose**: Retrieve a list of all available products, accessible to all users (public endpoint).
- **Request**:
    - **Method**: GET
    - **Path**: /api/products/
- **Response**:
    - **Success** (200 OK):
```
[
  {
    "productId": "string",    // Unique product identifier
    "name": "string",         // Product name
    "description": "string",  // Product description
    "price": "number",        // Price in currency (e.g., INR)
    "imageUrl": "string"      // URL to product image
  }
]
```
- **Security Considerations**:
    - Public endpoint, no authentication required.
    - Pagination implemented to manage large datasets.
### GET /api/products/:id
- **Purpose**: Retrieve detailed information about a specific product by its ID.
- **Request**:
    - **Method**: GET
    - **Path**: /api/products/:id
    - **Params**:
```
id: "string" // Product ID
```
- **Response**:
    - **Success** (200 OK):
```
{
  "productId": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "imageUrl": "string",
  "stock": "number"  // Available quantity (optional)
}
```
- **Error** (404 Not Found):
```
{
  "error": "Product not found"
}
```
- **Security Considerations**:
    - Public endpoint, no authentication required.
### POST /api/products/upload
- **Purpose**: Allow admins to upload a new product, including images, to the system.
- **Request**:
    - **Method**: POST
    - **Path**: /api/products/upload
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required
```
- Content-Type: multipart/form-data
- **Body** (form-data):
```
name: "string" // Required, product name
description: "string" // Required, product description
price: "number" // Required, positive number
image1: "file" // Required, image file (e.g., JPG, PNG)
image2: "file" // Required, image file (e.g., JPG, PNG)
image3: "file" // Required, image file (e.g., JPG, PNG)
```
- **Response**:
    - **Success** (201 Created):
```
{
  "message": "Product uploaded successfully",
  "productId": "string",
  "imageUrl": "string"  // URL of uploaded image
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Invalid product data or missing image"
}
```
- **Error** (403 Forbidden):
```
{
  "error": "Access denied. Admin role required."
}
```
- **Security Considerations**:
    - Requires admin role, enforced via middleware.
    - Images uploaded to Cloudinary with validation for file type and size (e.g., max 5MB).
    - Input sanitization to prevent injection attacks.
---

## 6.5 Payment Endpoints
### POST /api/pay/create-order
- **Purpose**: Initiate a payment order using Razorpay for the user’s cart total.
- **Request**:
    - **Method**: POST
    - **Path**: /api/pay/create-order
    - **Headers**:
```
Authorization: Bearer <accessToken> // JWT token required`﻿` 
```
- **Body** (application/json):
```
{
  "amount": "number",    // Required, total amount in smallest currency unit (e.g., paise for INR)
  "currency": "string"   // Required, e.g., "INR"
}
```
- **Response**:
    - **Success** (200 OK):
```

{
  "orderId": "string",   // Razorpay order ID
  "amount": "number",
  "currency": "string",
  "key": "string"        // Razorpay API key for frontend integration
}


```
- **Error** (400 Bad Request):
```
{
  "error": "Invalid amount or currency"
}
```
- **Security Considerations**:

    - JWT token required.
    - Amount validated against cart total to prevent tampering.
    - Razorpay order created server-side using API credentials.
### POST /api/pay/verify-payment
- **Purpose**: Verify the authenticity of a payment made via Razorpay and update the order status.
- **Request**:
    - **Method**: POST
    - **Path**: /api/pay/verify-payment
    - **Headers**:

```
Authorization: Bearer <accessToken> // JWT token required
```
- **Body** (application/json):
```
{
  "orderId": "string",     // Razorpay order ID
  "paymentId": "string",   // Razorpay payment ID
  "signature": "string"    // Razorpay signature for verification
}
```
- **Response**:
    - **Success** (200 OK):
```
{
  "message": "Payment verified successfully",
  "orderId": "string",
  "paymentId": "string"
}
```
- **Error** (400 Bad Request):
```
{
  "error": "Payment verification failed"
}
```
- **Security Considerations**:

    - JWT token required.
    - Signature verified using Razorpay’s secret key with HMAC-SHA256.
    - Order status updated to "paid" only after successful verification.
### GET /api/pay/payment-success
- **Purpose**: Serve as a redirect endpoint after successful payment, optionally displaying a success page.
- **Request**:
    - **Method**: GET
    - **Path**: /api/pay/payment-success
    - **Query Parameters**:
```
orderId: "string" // Order ID for referenc
```
- **Response**:

    - **Success** (200 OK):
```
{
  "message": "Payment successful",
  "orderId": "string"
}
```
- Redirects to a success page (e.g., /success?orderId=<orderId>) or returns:

- **Error** (400 Bad Request):
```
{
  "error": "Invalid order ID"
}
```
- **Security Considerations**:
    - No authentication required for the redirect.
    - Order ID validated to ensure it exists and is paid.
---

## 7. Authentication, Middleware & Refresh Tokens
This section details the security mechanisms that safeguard the API, ensuring that only authenticated and authorized users can access sensitive endpoints.

### JWT Authentication
- **Short-Lived Access Tokens:**
    - Upon successful login, the system issues a JSON Web Token (JWT) that contains the user's unique identifier, username, and role.
    - The token is signed with a secret key stored in an environment variable, ensuring its integrity and authenticity.
    - The access token has a short expiration period (e.g., 1 minute) to minimize the risk in case it is compromised.
    - Every protected API endpoint requires a valid access token in the `Authorization`  header, following the `Bearer <token>`  format.
### Refresh Tokens
- **Purpose & Security:**
    - Refresh tokens are used to obtain new access tokens without requiring the user to re-authenticate.
    - These tokens are issued alongside the access token and have a longer expiration time (e.g., 7 days).
    - Refresh tokens are stored as HTTP-only cookies, meaning they are not accessible via JavaScript, which protects them from cross-site scripting (XSS) attacks.
- **Token Renewal Flow:**
    - When an access token expires, the client automatically sends a request to the `/refresh`  endpoint.
    - The server verifies the refresh token present in the HTTP-only cookie.
    - If the refresh token is valid, the server issues a new access token, allowing the user to continue accessing protected resources without interruption.
    - This mechanism ensures a balance between security (via short-lived access tokens) and usability (via refresh tokens).
### Custom Middleware for Authentication & RBAC
- **jwtExtractor Middleware:**
    - Extracts the JWT from the `Authorization`  header.
    - Parses and validates the token to ensure that it is correctly formed and unexpired.
    - If the token is valid, it attaches the token to the request object for further processing by subsequent middleware or controllers.
- **userExtractor Middleware:**
    - After the JWT is extracted, this middleware decodes the token to retrieve the user’s details such as ID, username, and role.
    - It ensures that only users with a valid token can proceed to access protected endpoints.
    - The middleware enforces Role-Based Access Control (RBAC) by verifying that the user's role corresponds to the required permission level for the requested resource (e.g., admin-only endpoints).
    - In the case of token validation failure (e.g., missing, malformed, or expired tokens), the middleware returns appropriate error responses, ensuring that unauthorized requests are blocked immediately.
### Detailed Flow of a Secured API Request:
1. **Request Initiation:**
    - A user sends an HTTP request to a protected endpoint, including the JWT in the `Authorization`  header.
2. **Token Extraction:**
    - The **jwtExtractor** middleware intercepts the request, extracts the JWT, and attaches it to the request object.
3. **Token Verification:**
    - The **userExtractor** middleware verifies the extracted token using the secret key.
    - On successful verification, user details are decoded and attached to the request object (e.g., `req.id` , `req.username` , `req.role` ).
4. **RBAC Enforcement:**
    - Depending on the endpoint, the system checks if the user's role (from `req.role` ) matches the required permissions.
    - If the role is insufficient (e.g., a regular user attempting to access admin endpoints), an error is returned.
5. **Access Token Expiration:**
    - If the access token has expired, the client automatically triggers a call to the `/refresh`  endpoint.
6. **Token Renewal:**
    - The refresh token, securely stored in an HTTP-only cookie, is validated.
    - On successful validation, a new short-lived access token is issued, and the user can retry the original request.
> _By implementing these robust authentication mechanisms and middleware layers, the system ensures secure, scalable, and user-friendly access control while mitigating common security threats such as token theft and XSS attacks._

---

## 8. Database Models
The database layer is designed with flexibility and performance in mind. Two primary models have been defined for the CoffeeCraze platform: the **User Model** and the **Product Model**. Both models utilize MongoDB via Mongoose and are constructed with careful attention to field types, validation, and indexing strategies to optimize query performance.

---

### 8.1 User Model
The **User Model** captures all essential user information and their interactions with the platform. It is divided into several sections:

#### Profile
- **name** (`String` , _required_): The full name of the user.
- **email** (`String` , _required_, _unique_): The user’s email address; enforced unique to prevent duplicate accounts.
- **phone** (`String` ): An optional field to store the user’s contact number.
- **role** (`String` , _enum: ['customer', 'admin']_, _default: 'customer'_): Defines the user’s role, which is critical for RBAC.
- **createdAt** (`Date` , _default: Date.now_): Timestamp for when the user was created.
- **updatedAt** (`Date` , _default: Date.now_): Timestamp for the last update to the user profile.
#### Authentication
- **passwordHash** (`String` , _required_): Stores the hashed version of the user's password.
- **lastLogin** (`Date` , _default: null_): Records the last login time.
- **resetOTP** (`String` ): Stores a One-Time Password for password resets.
- **otpExpires** (`Date` ): Expiration time for the OTP.
- **isLocked** (`Boolean` , _default: false_): Indicates whether the account is locked due to multiple failed attempts or security reasons.
#### Additional Data
- **orders** (`Array`  of Mixed Types, _default: []_): Stores orders associated with the user. Using a flexible schema allows the storage of complex order objects.
- **cart** (`Array`  of Mixed Types, _default: []_): Contains items currently in the user's shopping cart.
- **address** (`Array`  of Mixed Types, _default: []_): Stores user addresses, allowing for multiple addresses per user.
**Indexing & Optimization:**

- The **email** field is uniquely indexed to accelerate lookups and enforce uniqueness.
- Additional indexes can be considered on fields like `profile.name`  or within subdocuments if queries frequently target these attributes.
---

### 8.2 Product Model
The **Product Model** is designed to manage the catalog of products available on the platform. Each product record includes detailed information that supports both display and transaction processing.

#### Core Fields
- **itemName** (`String` , _required_, _trim_): The name of the product, with whitespace trimmed.
- **description** (`String` , _required_): A detailed description of the product.
- **price** (`Number` , _required_): The product's price.
- **quantity** (`Number` , _required_): Available inventory count.
- **keywords** (`Array`  of `String` , _required_): Tags or keywords to assist in product search and categorization.
- **sizes** (`Array`  of `String` , _required_): Lists available sizes for the product (e.g., small, medium, large).
- **story** (`String` , _required_): A narrative about the product that can enhance customer engagement.
- **videoUrl** (`String` , _required_): URL to a product video, enhancing product presentation.
#### Image Management
- **image1**, **image2**, **image3** (`String` , _required_): URLs for product images, managed via Cloudinary. Storing multiple images supports a rich media experience.
#### Timestamps
- The schema includes `timestamps: true` , which automatically manages `createdAt`  and `updatedAt`  fields for each product document.
**Indexing & Optimization:**

- Indexes can be created on fields like **itemName**, **keywords**, and **price** to improve search and retrieval times.
- Smart indexing strategies (e.g., compound indexes on frequently queried fields) ensure that the database can handle complex queries efficiently.
---

## 9. Email Service Integration
The email service is a critical component of the CoffeeCraze platform, ensuring effective communication with users through transactional emails. This integration is primarily handled by **Nodemailer**, which is configured with secure SMTP settings to send emails reliably.

### Nodemailer Configuration
- **SMTP Setup:**
    - **Host & Port:** The service uses a secure SMTP server (e.g., Gmail’s SMTP server) configured with the appropriate host (`smtp.gmail.com` ) and port (`465`  for SSL).
    - **Authentication:**
        - The SMTP credentials (email user and password) are securely stored in environment variables (`EMAIL_USER`  and `EMAIL_PASS` ), ensuring that sensitive information is not hard-coded in the codebase.
    - **Security Settings:**
        - The connection is secured using SSL/TLS to encrypt the communication between the server and the SMTP service.
        - Additional settings like `connectionTimeout`  and `debug`  mode can be configured to help diagnose any connectivity issues during email delivery.
### Email Templates
- **Dynamic HTML Templates:**
    - **Order Confirmation & Payment Success:**
        - Templates like `orderSuccessTemp`  are used to create visually appealing, branded emails that provide detailed information about successful payments, including order numbers, amounts, and dates.
    - **Welcome Emails:**
        - Templates such as `signupWelcomeTemp`  dynamically incorporate user-specific data (e.g., the recipient’s name) to deliver personalized welcome messages.
### Sending Process
- **Asynchronous Email Dispatch:**
    - Emails are sent asynchronously to ensure that the email dispatch process does not block the main application flow. This is particularly important during high-traffic periods.
- **Error Handling:**
    - Robust error handling is implemented to catch and log any failures during the email sending process. This ensures that issues can be diagnosed and resolved quickly without affecting the user experience.
    - In scenarios where the email fails to send, the error is logged with detailed stack traces, and fallback measures (like retry mechanisms) can be considered for future enhancements.
- **Usage in Application:**
    - The email service is invoked at key moments in the user journey, such as after successful signup or payment confirmation, ensuring that users receive immediate feedback and confirmation regarding their transactions.
### Security Considerations
- **Sensitive Data Management:**
    - All credentials and configuration details are managed through environment variables, ensuring that sensitive information remains secure.
- **Compliance:**
    - The system adheres to best practices for sending emails, including managing user consent and complying with email communication regulations (such as CAN-SPAM).
---

## 10. Future Enhancements
The following enhancements are planned to further improve system performance, security, and maintainability:

- **Centralized Logging & Error Monitoring:**
    - Integrate advanced logging tools like **Winston** or error monitoring solutions such as **Sentry**.
    - This will provide a unified view of application logs and real-time alerts on exceptions or performance issues, aiding in rapid diagnosis and resolution.
- **Caching:**
    - Implement **Redis caching** to store frequently accessed data and reduce the load on the primary database.
    - Caching will optimize API response times, particularly for read-heavy endpoints like product listings and user data.
- **Advanced Security:**
    - Explore additional security measures including **multi-factor authentication (MFA)** for enhanced user account protection.
    - Consider API key management for specific services to restrict access and monitor API usage more effectively.
- **CI/CD Pipeline:**
    - Automate the deployment process using tools like **GitHub Actions** or similar CI/CD solutions.
    - This will streamline testing, ensure consistent builds, and reduce the risk of manual deployment errors, leading to more reliable releases.
- **Enhanced API Documentation:**
    - Utilize **Swagger/OpenAPI** to create interactive API documentation.
    - This will facilitate easier onboarding for new developers, allow for automated testing of endpoints, and serve as an up-to-date reference for all API consumers.
> _These enhancements aim to create a robust, secure, and efficient system, ensuring that CoffeeCraze remains scalable and maintainable as the platform grows._



# 11. Glossary & Appendix
**RBAC (Role-Based Access Control):** A security mechanism for restricting system access based on user roles.

**JWT (JSON Web Token):** A compact, URL-safe means of representing claims between two parties.

**HTTP-only Cookies:** Cookies that are inaccessible to JavaScript, providing an additional security layer.

**Rate Limiting:** Technique to restrict the number of requests a user can make within a time window to prevent abuse.

**Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

**Render:** A cloud platform for hosting web applications with manual or automated deployments.



> **Metrics:**
**Latency:** <250ms API response (P95)
**Uptime:** 99.98% (via Render monitoring)







