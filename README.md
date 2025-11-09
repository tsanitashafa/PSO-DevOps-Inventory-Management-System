
# Inventory Management System (Full-Stack Application)

A full-stack inventory and sales management system designed for businesses.
Supports multi-user access, product categories, suppliers, customers, brands, expense tracking, sales and returns, and enforces data integrity to prevent accidental deletion of inter-related data.

---
##current-in developement-process-soon-to-be-finished

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

---

## Project Structure

```
inventory-management-system/
│
├── backend/       # Node.js + Express API
│     ├── controllers/   # Business logic
│     ├── models/        # Mongoose schemas
│     ├── routes/        # API endpoints
│     └── utils/         # Helpers, authentication, validation
│
├── frontend/      # React application
│     ├── components/    # Reusable UI components
│     ├── pages/         # Application pages
│     └── services/      # API service calls
│
└── README.md      # Project documentation
```

---

## Getting Started

### Prerequisites

* Node.js (16+ recommended)
* MongoDB (local installation or cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/al-rasels/inventory-management-system-full-stack-app.git
   cd inventory-management-system-full-stack-app
   ```

2. Backend setup:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend folder:

   ```
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```

3. Frontend setup:

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file if needed:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Run backend:

   ```bash
   cd ../backend
   npm run dev
   ```

5. Run frontend:

   ```bash
   cd ../frontend
   npm start
   ```

6. Open a browser and navigate to `http://localhost:3000`

---

## Usage

* Login or register depending on user roles
* Set up master data: brands, categories, suppliers, customers, expense types
* Add products with brand and category references
* Manage stock through purchases and sales
* Handle returns for purchases and sales
* Record business expenses by type, date, and amount
* View reports and dashboards for stock levels, top-selling products, and other metrics
* Data safety ensures that records with dependencies cannot be deleted
* Role-based permissions control access to critical actions

---

## Notes

* Keep JWT secrets and database connection strings secure
* For production, consider HTTPS, environment variable management, database backups, and logging
* Data integrity prevents orphaned records; test workflows thoroughly
* Current implementation supports a single business (single-tenant)

---

## Future Enhancements

* Barcode or QR code scanning for products
* Real-time stock updates
* Multi-branch or multi-warehouse support
* Advanced dashboards based on user roles
* Bulk import/export of data
* Mobile-friendly UI or companion app
* Analytics, low-stock alerts, and reorder suggestions

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome. Submit issues, pull requests, or feature requests. For questions, open an issue in the repository.

