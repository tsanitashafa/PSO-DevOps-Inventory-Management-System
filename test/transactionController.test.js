// 1. Mocking virtual model di baris paling atas agar tidak crash path relatif Mongoose
jest.mock("../src/models/Expenses/ExpenseTypesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Expenses/ExpensesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Purchases/PurchasesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Sales/SalesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Returns/ReturnsModel", () => ({}), { virtual: true });

// 2. Mocking services global yang dipanggil oleh controller-controller transaksi
const CreateService = require("../src/services/common/CreateService");
const CreateParentChildService = require("../src/services/common/CreateParentChildService");

jest.mock("../src/services/common/CreateService");
jest.mock("../src/services/common/CreateParentChildService");

// 3. Import berkas controller asli kamu
const ExpenseTypesController = require("../src/controllers/Expense/ExpenseTypesController");
const ExpensesController = require("../src/controllers/Expense/ExpensesController");
const PurchasesController = require("../src/controllers/Purchases/PurchasesController");
const SalesController = require("../src/controllers/Sales/SalesController");
const ReturnsController = require("../src/controllers/Returns/ReturnsController");

describe("TRANSACTION & EXPENSE CONTROLLERS LAYER TEST", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            headers: { email: "admin@gmail.com" },
            body: { Name: "Operasional Toko", Parent: {}, Childs: [] },
            params: { id: "60d5ecb8b4259b1d1f84d111" }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    /* ========================================================================== */
    /* 1. EXPENSE CONTROLLERS TEST (SUCCESS & FAIL)                               */
    /* ========================================================================== */
    describe("Expense Components", () => {
        // --- Expense Type ---
        test("should successfully trigger Expense Type creation", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.CreateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should handle fail or validation error during Expense Type creation", async () => {
            CreateService.mockResolvedValue({ status: "fail", data: "Invalid input" });
            await ExpenseTypesController.CreateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        // --- Core Expense ---
        test("should successfully trigger Core Expense creation", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpensesController.CreateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should handle fail or validation error during Core Expense creation", async () => {
            CreateService.mockResolvedValue({ status: "fail", data: "Database write failed" });
            await ExpensesController.CreateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    /* ========================================================================== */
    /* 2. CORE TRANSACTION CONTROLLERS TEST (PARENT-CHILD FLOW - SUCCESS & FAIL)  */
    /* ========================================================================== */
    describe("Inventory Core Flow Controllers", () => {
        // --- Purchases ---
        test("should successfully handle Purchase Transaction via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await PurchasesController.CreatePurchases(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should handle fail during Purchase Transaction via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail", data: "Transaction rolled back" });
            await PurchasesController.CreatePurchases(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        // --- Sales ---
        test("should successfully handle Sales Invoice via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await SalesController.CreateSales(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should handle fail during Sales Invoice via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail", data: "Out of stock" });
            await SalesController.CreateSales(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        // --- Returns ---
        test("should successfully handle Returns via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await ReturnsController.CreateReturns(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("should handle fail during Returns via controller", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail", data: "Invalid Invoice ID" });
            await ReturnsController.CreateReturns(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});