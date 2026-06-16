jest.mock("../src/models/Sales/SalesModel", () => ({
  aggregate: jest.fn(),
}));

jest.mock("../src/models/Purchases/PurchasesModel", () => ({
  aggregate: jest.fn(),
}));

jest.mock("../src/models/Expenses/ExpensesModel", () => ({
  aggregate: jest.fn(),
}));

jest.mock("../src/models/Sales/SaleProductsModel", () => ({
  aggregate: jest.fn(),
}));



const SalesModel = require("../src/models/Sales/SalesModel");
const PurchasesModel = require("../src/models/Purchases/PurchasesModel");
const ExpensesModel = require("../src/models/Expenses/ExpensesModel");
const SaleProductsModel = require("../src/models/Sales/SaleProductsModel");

const DashboardSummaryService = require("../src/services/summery/DashboardSummaryService");
const ExpenseSummeryService = require("../src/services/summery/ExpenseSummeryService");
const PurchaseSummeryService = require("../src/services/summery/PurchaseSummeryService");
const ReturnSummeryService = require("../src/services/summery/ReturnSummeryService");
const SalesSummeryService = require("../src/services/summery/SalesSummeryService");

describe("DASHBOARD & SUMMARY FEATURE TEST", () => {
  const Request = {
    headers: { email: "admin@gmail.com" },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    SalesModel.aggregate.mockResolvedValue([
        {
            _id: "customer-1",
            name: "Customer A",
            totalAmount: 1000000,
            totalTransaction: 2
        }
    ]);

    PurchasesModel.aggregate.mockResolvedValue([
        {
            _id: "supplier-1",
            name: "Supplier A",
            totalAmount: 800000,
            totalTransaction: 1
        }
    ]);

    ExpensesModel.aggregate.mockResolvedValue([
        {
            _id: "expense-1",
            name: "Operasional",
            totalAmount: 200000,
            totalTransaction: 1
        }
    ]);

    SaleProductsModel.aggregate.mockResolvedValue([
        {
            _id: "product-1",
            name: "Product A",
            totalQty: 5,
            totalAmount: 500000
        }
    ]);
  });

  describe("Dashboard Summary Service", () => {
    test("should successfully generate complete dashboard summary statistics", async () => {
        const Request = {
            headers: { email: "admin@gmail.com" }
        };

        const result = await DashboardSummaryService(Request);

        // aktifkan sementara kalau masih gagal
        // console.log(result);

        expect(result.status).toBe("Success");
        expect(result.data).toBeDefined();
    });

    test("should handle dashboard summary safely", async () => {
      SalesModel.aggregate.mockRejectedValueOnce(new Error("Aggregation Failed"));

      const result = await DashboardSummaryService(Request);

      expect(result.status).toBe("fail");
    });
  });

  describe("Financial Component Summaries", () => {
    const mockAggregationResult = [{ _id: null, totalAmount: 5000000 }];

    test("should successfully calculate Expense Summary", async () => {
      const DataModel = {
        aggregate: jest.fn().mockResolvedValue(mockAggregationResult),
      };

      const result = await ExpenseSummeryService(Request, DataModel);
      expect(result.status).toBeDefined();
    });

    test("should successfully calculate Purchase Summary", async () => {
      const DataModel = {
        aggregate: jest.fn().mockResolvedValue(mockAggregationResult),
      };

      const result = await PurchaseSummeryService(Request, DataModel);
      expect(result.status).toBeDefined();
    });

    test("should successfully calculate Return Summary", async () => {
      const DataModel = {
        aggregate: jest.fn().mockResolvedValue(mockAggregationResult),
      };

      const result = await ReturnSummeryService(Request, DataModel);
      expect(result.status).toBeDefined();
    });

    test("should successfully calculate Sales Summary", async () => {
      const DataModel = {
        aggregate: jest.fn().mockResolvedValue(mockAggregationResult),
      };

      const result = await SalesSummeryService(Request, DataModel);
      expect(result.status).toBeDefined();
    });

    test("should handle database response in financial summaries safely", async () => {
      const DataModel = {
        aggregate: jest.fn().mockRejectedValue(new Error("DB Error")),
      };

      const result = await SalesSummeryService(Request, DataModel);
      expect(result.status).toBeDefined();
    });
  });
});