/**
 * API Endpoints (Express Router Configuration)
 *
 * Responsibilities:
 * - Load and configure express routes
 * - Handle Request validation and authentication
 * - Delegate business logic to controllers
 * - Mount API routes
 * - Export the configured router
 */

// Importing express library
const express = require("express");

// Importing Middlewares and Controllers
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");
const BrandsController = require("../controllers/Brands/BrandsController");
const CategoriesController = require("../controllers/Categories/CategoriesController");
const CustomersController = require("../controllers/Customers/CustomersController");
const SuppliersController = require("../controllers/Suppliers/SuppliersController");
const ExpenseTypesController = require("../controllers/Expense/ExpenseTypesController");
const ExpensesController = require("../controllers/Expense/ExpensesController");
const ProductsController = require("../controllers/Products/ProductsController");
const PurchasesController = require("../controllers/Purchases/PurchasesController");
const SalesController = require("../controllers/Sales/SalesController");
const ReturnsController = require("../controllers/Returns/ReturnsController");

/* -------------------------------------------------------------------------- */
//  Creating Router instance
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Users Routes                                  */
/* -------------------------------------------------------------------------- */

// 1. User Registration Route
router.post("/Registration", UsersController.Registration);

// 2. User Login Route
router.post("/Login", UsersController.Login);

// 3. Update User Profile Route
router.post(
  "/ProfileUpdate",
  AuthVerifyMiddleware,
  UsersController.ProfileUpdate
);

// 4. Get User Details Route
router.get(
  "/ProfileDetails",
  AuthVerifyMiddleware,
  UsersController.ProfileDetails
);
// 5. Password Recovery Routes
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
// 6. Verify OTP Route
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
// 7. Reset Password Route
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

/* -------------------------------------------------------------------------- */
/*                              Brands Routes                                 */
/* -------------------------------------------------------------------------- */

//Create Brand
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
// Update Brand
router.post(
  "/UpdateBrand/:id",
  AuthVerifyMiddleware,
  BrandsController.UpdateBrand
);
// Brand List
router.get(
  "/BrandList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  BrandsController.BrandList
);
// Brand Dropdown
router.get(
  "/BrandDropDown",
  AuthVerifyMiddleware,
  BrandsController.BrandDropDown
);
// Delete Brand
router.get(
  "/DeleteBrand/:id",
  AuthVerifyMiddleware,
  BrandsController.DeleteBrand
);

/* -------------------------------------------------------------------------- */
/*                             Categories Routes                              */
/* -------------------------------------------------------------------------- */

//Create Categories
router.post(
  "/CreateCategories",
  AuthVerifyMiddleware,
  CategoriesController.CreateCategories
);
// Update Categories
router.post(
  "/UpdateCategories/:id",
  AuthVerifyMiddleware,
  CategoriesController.UpdateCategories
);
// Categories List
router.get(
  "/CategoriesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CategoriesController.CategoriesList
);
// Categories Dropdown
router.get(
  "/CategoriesDropDown",
  AuthVerifyMiddleware,
  CategoriesController.CategoriesDropDown
);
// Delete Categories
router.get(
  "/DeleteCategories/:id",
  AuthVerifyMiddleware,
  CategoriesController.DeleteCategories
);

/* -------------------------------------------------------------------------- */
/*                             Customers Routes                               */
/* -------------------------------------------------------------------------- */

//Create Customers
router.post(
  "/CreateCustomers",
  AuthVerifyMiddleware,
  CustomersController.CreateCustomers
);
// Update Customers
router.post(
  "/UpdateCustomers/:id",
  AuthVerifyMiddleware,
  CustomersController.UpdateCustomers
);
// Customers List
router.get(
  "/CustomersList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CustomersController.CustomersList
);
//  Customers Dropdown
router.get(
  "/CustomersDropDown",
  AuthVerifyMiddleware,
  CustomersController.CustomersDropDown
);

// Delete Customer
router.get(
  "/DeleteCustomer/:id",
  AuthVerifyMiddleware,
  CustomersController.DeleteCustomer
);

/* -------------------------------------------------------------------------- */
/*                             Suppliers Routes                               */
/* -------------------------------------------------------------------------- */

//Create Suppliers
router.post(
  "/CreateSuppliers",
  AuthVerifyMiddleware,
  SuppliersController.CreateSuppliers
);
// Update Suppliers
router.post(
  "/UpdateSuppliers/:id",
  AuthVerifyMiddleware,
  SuppliersController.UpdateSuppliers
);
// Suppliers List
router.get(
  "/SuppliersList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SuppliersController.SuppliersList
);
// Suppliers Dropdown
router.get(
  "/SuppliersDropDown",
  AuthVerifyMiddleware,
  SuppliersController.SuppliersDropDown
);

// Delete Supplier
router.get(
  "/DeleteSupplier/:id",
  AuthVerifyMiddleware,
  SuppliersController.DeleteSupplier
);
/* -------------------------------------------------------------------------- */
/*                             ExpenseTypes Routes                            */
/* -------------------------------------------------------------------------- */

//Create ExpenseTypes
router.post(
  "/CreateExpenseTypes",
  AuthVerifyMiddleware,
  ExpenseTypesController.CreateExpenseTypes
);
// Update ExpenseTypes
router.post(
  "/UpdateExpenseTypes/:id",
  AuthVerifyMiddleware,
  ExpenseTypesController.UpdateExpenseTypes
);

// ExpenseTypes List
router.get(
  "/ExpenseTypesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesList
);
// ExpenseTypes Dropdown
router.get(
  "/ExpenseTypesDropDown",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesDropDown
);
// Delete ExpenseType
router.get(
  "/DeleteExpenseType/:id",
  AuthVerifyMiddleware,
  ExpenseTypesController.DeleteExpenseType
);

/* -------------------------------------------------------------------------- */
/*                              Expenses Route                                */
/* -------------------------------------------------------------------------- */
// Create Expenses
router.post(
  "/CreateExpenses",
  AuthVerifyMiddleware,
  ExpensesController.CreateExpenses
);
// Update Expenses
router.post(
  "/UpdateExpenses/:id",
  AuthVerifyMiddleware,
  ExpensesController.UpdateExpenses
);

//Get Expenses List
router.get(
  "/ExpensesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpensesController.ExpensesList
);
// Delete Expense
router.get(
  "/DeleteExpense/:id",
  AuthVerifyMiddleware,
  ExpensesController.DeleteExpense
);

/* -------------------------------------------------------------------------- */
/*                              Products Route                                */
/* -------------------------------------------------------------------------- */
// Create Products
router.post(
  "/CreateProducts",
  AuthVerifyMiddleware,
  ProductsController.CreateProducts
);
// Update Products
router.post(
  "/UpdateProducts/:id",
  AuthVerifyMiddleware,
  ProductsController.UpdateProducts
);
router.get(
  "/ProductsList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ProductsController.ProductsList
);
// Delete Products
router.get(
  "/DeleteProducts/:id",
  AuthVerifyMiddleware,
  ProductsController.DeleteProduct
);
/* -------------------------------------------------------------------------- */
/*                             Purchases Route                                */
/* -------------------------------------------------------------------------- */
// Create Purchases
router.post(
  "/CreatePurchases",
  AuthVerifyMiddleware,
  PurchasesController.CreatePurchases
);
// Purchases List
router.get(
  "/PurchasesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesList
);
// Purchases Delete
router.get(
  "/DeletePurchase/:id",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesDelete
);

/* -------------------------------------------------------------------------- */
/*                             Sales Route                                    */
/* -------------------------------------------------------------------------- */
// Create Sales
router.post("/CreateSales", AuthVerifyMiddleware, SalesController.CreateSales);
// Sales List
router.get(
  "/SalesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SalesController.SalesList
);
// Sale Delete
router.get(
  "/DeleteSale/:id",
  AuthVerifyMiddleware,
  SalesController.SaleDelete
);


/* -------------------------------------------------------------------------- */
/*                             Returns Route                                  */
/* -------------------------------------------------------------------------- */
// Create Returns
router.post(
  "/CreateReturns",
  AuthVerifyMiddleware,
  ReturnsController.CreateReturns
);
// Returns List
router.get(
  "/ReturnsList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ReturnsController.ReturnsList
);
// Return Delete
router.get(
  "/DeleteReturn/:id",
  AuthVerifyMiddleware,
  ReturnsController.ReturnDelete
);

/* -------------------------------------------------------------------------- */
/*                              Report Controller                           */
/* -------------------------------------------------------------------------- */
// Expense Report
router.post(
  "/ExpenseByDate",
  AuthVerifyMiddleware,
  ExpensesController.GetExpenseReport
);

// Purchase Report
router.post(
  "/PurchaseByDate",
  AuthVerifyMiddleware,
  PurchasesController.GetPurchaseReport
);

// Return Report
router.post(
  "/ReturnByDate",
  AuthVerifyMiddleware,
  ReturnsController.GetReturnReport
);

// Return Report
router.post(
  "/SalesByDate",
  AuthVerifyMiddleware,
  SalesController.GetSalesReport
);

/* -------------------------------------------------------------------------- */
/*                              Summery Controller                           */
/* -------------------------------------------------------------------------- */
// Expense Summery
router.get(
  "/ExpenseSummery",
  AuthVerifyMiddleware,
  ExpensesController.GetExpenseSummery
);

// Purchase Summery
router.get(
  "/PurchaseSummery",
  AuthVerifyMiddleware,
  PurchasesController.GetPurchaseSummery
);

// Return Summery
router.get(
  "/ReturnSummery",
  AuthVerifyMiddleware,
  ReturnsController.GetReturnSummery
);

// Return Summery
router.get(
  "/SalesSummery",
  AuthVerifyMiddleware,
  SalesController.GetSalesSummery
);







/* -------------------------------------------------------------------------- */
/*                              Exporting Router                              */
/* -------------------------------------------------------------------------- */
module.exports = router;
