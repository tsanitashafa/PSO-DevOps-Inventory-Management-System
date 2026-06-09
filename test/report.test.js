const ExpenseReportService = require("../src/services/report/ExpenseReportService");
const PurchaseReportService = require("../src/services/report/PurchaseReportService");
const SalesReportService = require("../src/services/report/SalesReportService");
const ReturnReportService = require("../src/services/report/ReturnReportService");

// Import model yang akan di-mock
const ExpenseModel = require("../src/models/Expenses/ExpensesModel");
const PurchaseProductModel = require("../src/models/Purchases/PurchaseProductsModel");
const SaleProductModel = require("../src/models/Sales/SaleProductsModel");
const ReturnProductModel = require("../src/models/Returns/ReturnProductsModel");

// Mock database model agar tidak mengakses database asli saat testing
jest.mock("../src/models/Expenses/ExpensesModel");
jest.mock("../src/models/Purchases/PurchaseProductsModel");
jest.mock("../src/models/Sales/SaleProductsModel");
jest.mock("../src/models/Returns/ReturnProductsModel");

describe("REPORT FEATURE TEST", () => {

    describe("Expense Report", () => {

        // Test generate laporan pengeluaran berhasil
        test("should generate expense report successfully", async () => {

        ExpenseModel.aggregate.mockResolvedValue([
            {
            Total: [
                {
                TotalAmount: 100000
                }
            ]
            }
        ]);

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await ExpenseReportService(req);

        expect(result.status).toBe("success");
        expect(result.data).toBeDefined();

        });

        // Test generate laporan pengeluaran gagal
        test("should return fail when expense report throws error", async () => {

        ExpenseModel.aggregate.mockRejectedValue(
            new Error("Database Error")
        );

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await ExpenseReportService(req);

        expect(result.status).toBe("fail");

        });

    });

    describe("Purchase Report", () => {

        // Test generate laporan pembelian berhasil
        test("should generate purchase report successfully", async () => {

        PurchaseProductModel.aggregate.mockResolvedValue([
            {
            Total: [
                {
                TotalAmount: 100000
                }
            ]
            }
        ]);

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await PurchaseReportService(req);

        expect(result.status).toBe("success");
        expect(result.data).toBeDefined();

        });

        // Test generate laporan pembelian gagal
        test("should return fail when purchase report throws error", async () => {

        PurchaseProductModel.aggregate.mockRejectedValue(
            new Error("Database Error")
        );

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await PurchaseReportService(req);

        expect(result.status).toBe("fail");

        });

    });

    describe("Sales Report", () => {

        // Test generate laporan penjualan berhasil
        test("should generate sales report successfully", async () => {

        SaleProductModel.aggregate.mockResolvedValue([
            {
            Total: [
                {
                TotalAmount: 500000
                }
            ]
            }
        ]);

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await SalesReportService(req);

        expect(result.status).toBe("success");
        expect(result.data).toBeDefined();

        });

        // Test generate laporan penjualan gagal
        test("should return fail when sales report throws error", async () => {

        SaleProductModel.aggregate.mockRejectedValue(
            new Error("Database Error")
        );

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await SalesReportService(req);

        expect(result.status).toBe("fail");

        });

    });

    describe("Return Report", () => {

        // Test generate laporan retur berhasil
        test("should generate return report successfully", async () => {

        ReturnProductModel.aggregate.mockResolvedValue([
            {
            Total: [
                {
                TotalAmount: 250000
                }
            ]
            }
        ]);

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await ReturnReportService(req);

        expect(result.status).toBe("success");
        expect(result.data).toBeDefined();

        });

        // Test generate laporan retur gagal
        test("should return fail when return report throws error", async () => {

        ReturnProductModel.aggregate.mockRejectedValue(
            new Error("Database Error")
        );

        const req = {
            body: {
            FromDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        const result = await ReturnReportService(req);

        expect(result.status).toBe("fail");

        });

    });

});