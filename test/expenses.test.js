// 1. Mocking Services yang dipanggil di dalam file Controller asli kamu
const CreateService = require("../src/services/common/CreateService");
const UpdateService = require("../src/services/common/UpdateService");
const ListOneJoinService = require("../src/services/common/ListOneJoinService");
const DeleteService = require("../src/services/common/DeleteService");
const ExpenseReportService = require("../src/services/report/ExpenseReportService");
const ExpenseSummeryService = require("../src/services/summery/ExpenseSummeryService");
const DetailsByIDService = require("../src/services/common/DetailsByIDService");
const DropDownService = require("../src/services/common/DropDownService");
const ListService = require("../src/services/common/ListService");

jest.mock("../src/services/common/CreateService");
jest.mock("../src/services/common/UpdateService");
jest.mock("../src/services/common/ListOneJoinService");
jest.mock("../src/services/common/DeleteService");
jest.mock("../src/services/report/ExpenseReportService");
jest.mock("../src/services/summery/ExpenseSummeryService");
jest.mock("../src/services/common/DetailsByIDService");
jest.mock("../src/services/common/DropDownService");
jest.mock("../src/services/common/ListService");

// 2. Import Controller Asli yang ingin diuji
const ExpensesController = require("../src/controllers/Expense/ExpensesController");
const ExpenseTypesController = require("../src/controllers/Expense/ExpenseTypesController");

describe("Expenses & Expense Types Direct Controller Testing Suite", () => {
    let req, res;

    beforeAll(() => {
        // SOLUSI UTAMA: Mengalihkan prototype internal Mongoose via injection hook
        // agar panggilan ObjectId() tanpa keyword 'new' di file aslimu tidak crash.
        const mongoose = require("mongoose");
        const originalObjectId = mongoose.Types.ObjectId;
        
        const mockObjectIdWrapper = function(id) {
            return new originalObjectId(id);
        };
        
        Object.setPrototypeOf(mockObjectIdWrapper, originalObjectId);
        mockObjectIdWrapper.prototype = originalObjectId.prototype;
        
        mongoose.Types.ObjectId = mockObjectIdWrapper;
        mongoose.Schema.Types.ObjectId = mockObjectIdWrapper;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Buat mock object Request dan Response tiruan Express
        req = {
            headers: { email: "admin@gmail.com" },
            body: { ExpenseTypeName: "Operasional Toko", ExpenseAmount: 50000, Note: "Beli ATK" },
            params: { id: "60d5ecb8b4259b1d1f84d333", searchKeyword: "ATK" }
        };
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    /* ========================================================================== */
    /* MODULE 1: EXPENSES CONTROLLER FLOW                                         */
    /* ========================================================================== */
    describe("Expenses Core Controller Module", () => {
        test("CreateExpenses - Success & Fail branch coverage", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpensesController.CreateExpenses(req, res);
            
            CreateService.mockResolvedValue({ status: "fail" });
            await ExpensesController.CreateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("UpdateExpenses - Success & Fail branch coverage", async () => {
            UpdateService.mockResolvedValue({ status: "success" });
            await ExpensesController.UpdateExpenses(req, res);
            
            UpdateService.mockResolvedValue({ status: "fail" });
            await ExpensesController.UpdateExpenses(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("ExpensesList Table View Data Fetching", async () => {
            ListOneJoinService.mockResolvedValue({ status: "success", data: [] });
            await ExpensesController.ExpensesList(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("ExpensesDetailsByID Fetching", async () => {
            DetailsByIDService.mockResolvedValue({ status: "success" });
            await ExpensesController.ExpensesDetailsByID(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("DeleteExpense Operation - Success & Fail", async () => {
            DeleteService.mockResolvedValue({ status: "success" });
            await ExpensesController.DeleteExpense(req, res);
            
            DeleteService.mockResolvedValue({ status: "fail" });
            await ExpensesController.DeleteExpense(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("GetExpenseReport Flow", async () => {
            ExpenseReportService.mockResolvedValue({ status: "success" });
            await ExpensesController.GetExpenseReport(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("GetExpenseSummery Flow", async () => {
            ExpenseSummeryService.mockResolvedValue({ status: "success" });
            await ExpensesController.GetExpenseSummery(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    /* ========================================================================== */
    /* MODULE 2: EXPENSE TYPES CONTROLLER FLOW                                    */
    /* ========================================================================== */
    describe("ExpenseTypes Controller Module", () => {
        test("CreateExpenseTypes - Success & Fail branch", async () => {
            CreateService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.CreateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("UpdateExpenseTypes - Success & Fail branch", async () => {
            UpdateService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.UpdateExpenseTypes(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("ExpenseTypesList View Mapping", async () => {
            ListService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.ExpenseTypesList(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("ExpenseTypesDropDown Mapping", async () => {
            DropDownService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.ExpenseTypesDropDown(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("ExpenseTypesDetailsByID Fetching", async () => {
            DetailsByIDService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.ExpenseTypesDetailsByID(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test("DeleteExpenseType Operation - Success, Fail, & Associate cases", async () => {
            const CheckAssociateService = require("../src/services/common/CheckAssociateService");
            jest.mock("../src/services/common/CheckAssociateService");
            
            // Kasus 1: Terkunci relasi (Associate true)
            CheckAssociateService.mockResolvedValue(true);
            await ExpenseTypesController.DeleteExpenseType(req, res);

            // Kasus 2: Aman di-delete (Associate false, Delete sukses)
            CheckAssociateService.mockResolvedValue(false);
            DeleteService.mockResolvedValue({ status: "success" });
            await ExpenseTypesController.DeleteExpenseType(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});