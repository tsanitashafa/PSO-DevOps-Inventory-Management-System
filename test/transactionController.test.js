jest.mock("../src/models/Expenses/ExpenseTypesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Expenses/ExpensesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Purchases/PurchasesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Sales/SalesModel", () => ({}), { virtual: true });
jest.mock("../src/models/Returns/ReturnsModel", () => ({}), { virtual: true });

const CreateService = require("../src/services/common/CreateService");
const CreateParentChildService = require("../src/services/common/CreateParentChildService");

jest.mock("../src/services/common/CreateService");
jest.mock("../src/services/common/CreateParentChildService");

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

    describe("Expense Components (Success & Fail)", () => {
        test("Expense Type Creation - Success", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.CreateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Expense Type Creation - Fail", async () => {
            CreateService.mockResolvedValue({ status: "fail" });
            await ExpenseTypesController.CreateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Core Expense Creation - Success", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpensesController.CreateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Core Expense Creation - Fail", async () => {
            CreateService.mockResolvedValue({ status: "fail" });
            await ExpensesController.CreateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe("Inventory Core Flow Controllers (Success & Fail)", () => {
        test("Purchase Transaction - Success", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await PurchasesController.CreatePurchases(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Purchase Transaction - Fail", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail" });
            await PurchasesController.CreatePurchases(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Sales Invoice - Success", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await SalesController.CreateSales(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Sales Invoice - Fail", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail" });
            await SalesController.CreateSales(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Returns - Success", async () => {
            CreateParentChildService.mockResolvedValue({ status: "success" });
            await ReturnsController.CreateReturns(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("Returns - Fail", async () => {
            CreateParentChildService.mockResolvedValue({ status: "fail" });
            await ReturnsController.CreateReturns(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});