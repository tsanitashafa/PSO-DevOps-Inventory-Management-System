
# Full-Stack Inventory Management System  

A full-stack application to manage products, purchases, sales, expenses, returns, and reporting.  
It provides automation, security, and scalability with modular APIs and a responsive front-end.  

---

## Features  
- User authentication & role-based access (JWT + email verification).  
- Master data management: brands, categories, products, suppliers, customers.  
- Expense tracking with CRUD operations and reporting.  
- Purchase and sales management with return handling and rollback.  
- Reporting and dashboards for business and expenses.  
- React front-end with CRUD forms and dashboards.  

---

## Tech Stack  
- **Backend**: Node.js, Express.js (REST API)  
- **Database**: MongoDB  
- **Frontend**: React.js  
- **Authentication**: JWT + Email verification  
- **Testing**: Postman  
- **Deployment**: Render / Heroku / AWS  

---

## Project Structure  
```

inventory-system/
│── backend/          # Node.js + Express APIs
│   ├── models/       # Database schemas
│   ├── controllers/  # Business logic
│   ├── routes/       # API routes
│   └── utils/        # Auth, token, email
│
│── frontend/         # React.js app
│   ├── components/   # Reusable UI
│   ├── pages/        # Screens
│   └── services/     # API calls
│
└── README.md

````

---

## Getting Started  

### Prerequisites  
- Node.js (v16+)  
- MongoDB  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/inventory-system.git
   cd inventory-system
````

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend with:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

5. Run the backend:

   ```bash
   cd backend
   npm run dev
   ```

6. Run the frontend:

   ```bash
   cd frontend
   npm start
   ```

---

## Benefits

* Simplifies purchase & sales workflows.
* Centralized inventory and expense tracking.
* Real-time reports for better decisions.
* Scalable and maintainable architecture.
* Reduces manual errors with automation.

---

## Future Enhancements

* Role-based dashboards (Admin, Manager, Staff).
* Real-time notifications and order tracking.
* Barcode/QR code product scanning.
* Advanced reporting with charts/graphs.
* Integration with accounting software.

---

## License

This project is licensed under the [MIT License](LICENSE).
clear

