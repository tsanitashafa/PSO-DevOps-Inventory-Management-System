# Inventory Management System (Full-Stack Application)

A full-stack inventory and sales management system designed for businesses.  
Supports multi-user access, product categories, suppliers, customers, brands, expense tracking, sales and returns, and enforces data integrity to prevent accidental deletion of inter-related data.

---

## Currently in Development

This project is currently in development and will continue to be improved with automated testing, CI/CD pipeline implementation, cloud deployment, and monitoring.

---

## Project Overview

Inventory Management System is a web-based application designed to help businesses manage inventory processes digitally and in an integrated way.

This project is adapted from an open-source GitHub repository and used as the basis for implementing DevOps practices, including version control, automated testing, containerization, CI/CD pipeline, cloud deployment, and database integration.

The system supports several business operations, such as stock management, product management, purchase and sales transactions, supplier and customer management, expense tracking, reporting, dashboard monitoring, and user authentication.

---

## Features

* Multi-user system with role-based access (Admin, Manager, Staff)

* Master data management:

  * Brands
  * Categories
  * Products (linked to brands and categories)
  * Suppliers
  * Customers
  * Expense types

* Stock management:

  * Purchases (increase stock)
  * Sales (reduce stock)
  * Returns (sales returns, purchase returns)

* Expense management: track and categorize business expenses

* Reports and dashboards for key business metrics

* Data integrity: deletion of master data is restricted when dependent records exist

* Full CRUD functionality

* REST API backend with Node.js and Express

* Frontend built with React.js

* Persistent database using MongoDB

* JWT-based authentication

* Responsive web interface

---

## Technology Stack

* Backend: Node.js, Express.js
* Database: MongoDB with Mongoose
* Frontend: React.js
* Authentication: JSON Web Tokens (JWT)
* API Testing: Postman
* Automated Testing: Jest
* Containerization: Docker
* CI/CD: GitHub Actions
* Cloud Platform: Google Cloud Platform
* Deployment Service: Google Cloud Run
* Container Registry: Artifact Registry
* Cloud Database: MongoDB Atlas

---

## Project Structure

```
PSO-DevOps-Inventory-Management-System/
│
├── client/                  # React frontend application
│   ├── src/                 # Frontend source code
│   │   ├── pages/           # Application pages
│   │   ├── redux/           # State management
│   │   ├── components/      # Reusable UI components
│   │   └── services/        # API service calls
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
├── src/                     # Backend source code
│   ├── controllers/         # Request handlers and business logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── services/            # Application services
│   └── utility/             # Helper functions, authentication, validation
│
├── app.js                   # Express application configuration
├── index.js                 # Backend entry point
├── package.json             # Backend dependencies and scripts
├── Dockerfile               # Docker configuration
├── .dockerignore            # Docker ignored files
├── .env.example             # Example environment variables
├── .github/workflows/       # GitHub Actions CI/CD workflow
└── README.md                # Project documentation
```

> Note: In this project, the backend is located in the root folder and the frontend is located inside the `client` folder.

---

## Getting Started

### Prerequisites

Before running this project, make sure you have installed:

* Node.js version 16 or higher
* npm
* Git
* Visual Studio Code
* MongoDB Atlas account
* Google Cloud account, for deployment

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tsanitashafa/PSO-DevOps-Inventory-Management-System.git
cd PSO-DevOps-Inventory-Management-System
```

### 2. Backend Setup

Install backend dependencies from the root project folder:

```bash
npm install
```

Create a `.env` file in the root project folder:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE_TIME=7d
```

### 3. Frontend Setup

Go to the frontend folder:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder if needed:

```env
VITE_API_BASE_URL=http://localhost:8080
```

After installing frontend dependencies, go back to the root folder:

```bash
cd ..
```

### 4. Run Backend

From the root project folder:

```bash
npm start
```

or, if development script is available:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:8080
```

### 5. Run Frontend

Open a new terminal and run:

```bash
cd client
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

Open a browser and navigate to the frontend URL.

---

## Environment Variables

Environment variables are used to store sensitive configuration such as database connection strings, JWT secrets, and application ports.

### Backend Environment Variables

Create a `.env` file in the root project folder:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE_TIME=7d
```

### Frontend Environment Variables

Create a `.env` file inside the `client` folder if the frontend needs an API base URL:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Important notes:

* Do not upload the real `.env` file to GitHub.
* Make sure `.env` is included in `.gitignore`.
* Use `.env.example` to document required environment variables.
* Keep database credentials and JWT secrets private.

---

## Usage

* Login or register depending on user roles
* Set up master data: brands, categories, suppliers, customers, expense types
* Add products with brand and category references
* Manage stock through purchases and sales
* Handle returns for purchases and sales
* Record business expenses by type, date, and amount
* View reports and dashboards for stock levels, top-selling products, sales, purchases, expenses, and other metrics
* Data safety ensures that records with dependencies cannot be deleted
* Role-based permissions control access to critical actions

---

## Testing

This project uses Jest and Supertest for backend API testing.

### Install Testing Dependencies

```bash
npm install --save-dev jest supertest
```

### Add Test Script

Make sure the root `package.json` contains:

```json
"scripts": {
  "test": "jest"
}
```

If the `scripts` section already exists, only add the `test` script without deleting the existing scripts.

Example:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}
```

### Create Test Folder

Create a folder named `tests` in the root project folder:

```bash
mkdir tests
```

### Example Test File

Create a file:

```bash
tests/app.test.js
```

Example test:

```js
const request = require("supertest");
const app = require("../app");

describe("Basic API Test", () => {
  it("should return a successful response from the server", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
```

### Run Test

```bash
npm test
```

If the test passes, Jest will show a success result.

---

## MongoDB Atlas Setup

This project uses MongoDB Atlas as the cloud database service. MongoDB Atlas is used to store application data such as users, products, brands, categories, suppliers, customers, purchases, sales, returns, and expenses.

MongoDB Atlas was selected because it is suitable for cloud-based applications, supports flexible document-based data storage, and can be integrated easily with Node.js and Mongoose.

### General Setup Steps

1. Create a MongoDB Atlas account.
2. Create a new project in MongoDB Atlas.
3. Build a database cluster.
4. Create a database user with read and write access.
5. Configure network access.
6. Copy the MongoDB connection string.
7. Add the connection string to the application environment variable as `MONGO_URI`.
8. Test the database connection by running the backend application.

Example environment variable:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

For complete step-by-step setup instructions, see the full documentation here:

[Complete MongoDB Atlas and GCP Setup Documentation](https://docs.google.com/document/d/1YpAkTO3WDpqBC-XVWQlvbbWSRnnoKwuSbNlHhX_5b0Q/edit?usp=sharing)

---

## CI/CD Pipeline

This project implements CI/CD using GitHub Actions. The CI/CD pipeline is used to automate testing, Docker image build, and deployment to Google Cloud Run.

### CI/CD Workflow Overview

```text
Developer
   ↓
GitHub Repository
   ↓
GitHub Actions
   ↓
Run Testing
   ↓
Docker Build Process
   ↓
Push Image to Artifact Registry
   ↓
Deploy to Cloud Run
   ↓
MongoDB Atlas Integration
   ↓
Monitoring and Maintenance
```

### Continuous Integration

Continuous Integration is used to automatically validate the project whenever new code is pushed to the repository.

The CI process includes:

1. Checkout repository.
2. Install dependencies.
3. Run automated testing using Jest.
4. Stop the workflow if testing fails.

### Continuous Deployment

Continuous Deployment is used to automatically deploy the application to Google Cloud Run after the test and build process succeeds.

The CD process includes:

1. Authenticate GitHub Actions to Google Cloud Platform.
2. Build Docker image.
3. Push Docker image to Artifact Registry.
4. Deploy the application to Cloud Run.
5. Connect the deployed application to MongoDB Atlas.

For complete CI/CD and deployment setup, see:

[Complete MongoDB Atlas and GCP Setup Documentation](https://docs.google.com/document/d/1YpAkTO3WDpqBC-XVWQlvbbWSRnnoKwuSbNlHhX_5b0Q/edit?usp=sharing)

---

## Google Cloud Platform Deployment

This project is deployed using Google Cloud Platform. The main deployment service used is Google Cloud Run, which allows the application to run as a containerized web application without manually managing servers.

The deployment process is integrated with GitHub Actions to support CI/CD automation. When code is pushed to the main branch, GitHub Actions can automatically run testing, build the Docker image, push it to Artifact Registry, and deploy the application to Cloud Run.

### Deployment Tools

* Google Cloud Platform
* Google Cloud Run
* Artifact Registry
* Cloud Build
* IAM
* Workload Identity Federation
* Docker
* GitHub Actions
* MongoDB Atlas

### General Deployment Steps

1. Create a Google Cloud project.
2. Set the deployment region.
3. Enable the required Google Cloud services.
4. Create an Artifact Registry repository.
5. Prepare the Dockerfile for the application.
6. Configure environment variables for Cloud Run.
7. Connect the application to MongoDB Atlas.
8. Configure GitHub Actions for CI/CD.
9. Set up authentication between GitHub Actions and Google Cloud using Workload Identity Federation.
10. Deploy the application to Google Cloud Run.
11. Monitor deployment logs using GitHub Actions and Google Cloud logs.

### Required Environment Variables

The application requires several environment variables for deployment:

```env
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE_TIME=7d
```

### Required GitHub Secrets

The GitHub Actions workflow uses repository secrets to store sensitive credentials and configuration.

```text
GCP_PROJECT_ID
GCP_REGION
GAR_REPOSITORY
GCP_SERVICE_ACCOUNT
WIF_PROVIDER
MONGO_URI
JWT_SECRET
```

Explanation:

* `GCP_PROJECT_ID` stores the Google Cloud project ID.
* `GCP_REGION` stores the deployment region, for example `asia-southeast2`.
* `GAR_REPOSITORY` stores the Artifact Registry repository name.
* `GCP_SERVICE_ACCOUNT` stores the service account used for deployment.
* `WIF_PROVIDER` stores the Workload Identity Federation provider.
* `MONGO_URI` stores the MongoDB Atlas connection string.
* `JWT_SECRET` stores the secret key for authentication.

### Deployment Documentation

The complete deployment guide, including MongoDB Atlas setup, Google Cloud configuration, Artifact Registry setup, Cloud Run deployment, GitHub Actions workflow, and Workload Identity Federation configuration, is available in the documentation below:

[Complete MongoDB Atlas and GCP Setup Documentation](https://docs.google.com/document/d/1YpAkTO3WDpqBC-XVWQlvbbWSRnnoKwuSbNlHhX_5b0Q/edit?usp=sharing)

---

## Monitoring and Maintenance

Monitoring is performed through:

* GitHub Actions logs
* Google Cloud Run logs
* Cloud Build logs
* MongoDB Atlas monitoring

Monitoring is important to make sure:

* The deployment workflow runs successfully.
* The application is running without errors.
* The database connection is working.
* The application remains stable after every update.

---

## Notes

* Keep JWT secrets and database connection strings secure.
* Do not upload `.env` files to GitHub.
* Use MongoDB Atlas for production database.
* Use environment variables for sensitive configuration.
* For production, consider HTTPS, environment variable management, database backups, and logging.
* Data integrity prevents orphaned records; test workflows thoroughly.
* Current implementation supports a single business, also known as single-tenant usage.

---

## Future Enhancements

* Barcode or QR code scanning for products
* Real-time stock updates
* Multi-branch or multi-warehouse support
* Advanced dashboards based on user roles
* Bulk import/export of data
* Mobile-friendly UI or companion app
* Analytics, low-stock alerts, and reorder suggestions
* Audit logs for important transactions
* Improved role-based permission management
* Automated backup for database

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome. Submit issues, pull requests, or feature requests. For questions, open an issue in the repository.
