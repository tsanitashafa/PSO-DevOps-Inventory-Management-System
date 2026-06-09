const CreateService = require("../src/services/common/CreateService");
const DetailsByIDService = require("../src/services/common/DetailsByIDService");
const UpdateService = require("../src/services/common/UpdateService");
const DeleteService = require("../src/services/common/DeleteService");

describe("Master Data CRUD Service Test (Spreadsheet Test Cases)", () => {
    
    // Array Data Tiruan untuk Test Massal otomatis
    const masterDataModules = [
        { 
            module: "Brands", 
            payload: { Name: "Samsung" }, 
            invalidPayload: { Name: "" },
            updatePayload: { Name: "Samsung Official" }
        },
        { 
            module: "Categories", 
            payload: { Name: "Electronics" }, 
            invalidPayload: { Name: "" },
            updatePayload: { Name: "Gadgets" }
        },
        { 
            module: "Suppliers", 
            payload: { Name: "PT Maju Jaya", Phone: "08123456789", Email: "maju@jaya.com" }, 
            invalidPayload: { Name: "" },
            updatePayload: { Name: "PT Maju Jaya Tbk" }
        },
        { 
            module: "Customers", 
            payload: { CustomerName: "Tsanita", Phone: "08998765432", Email: "tsanita@mail.com" }, 
            invalidPayload: { CustomerName: "" },
            updatePayload: { CustomerName: "Tsanita Shafa" }
        },
        { 
            module: "Expense Types", 
            payload: { Name: "Operasional Toko" }, 
            invalidPayload: { Name: "" },
            updatePayload: { Name: "Biaya Operasional Bulanan" }
        }
    ];

    /* ========================================================================== */
    /* 1. SKENARIO CREATE (POST)                                                  */
    /* ========================================================================== */
    describe("1. Create Operations", () => {
        
        test.each(masterDataModules)(
            "should successfully create a new record in $module", 
            async ({ payload }) => {
                // PERBAIKAN: Tambahkan objek headers agar Request.headers['email'] tidak undefined
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    body: { ...payload } 
                };
                const DataModel = {
                    create: jest.fn().mockResolvedValue(payload)
                };

                const result = await CreateService(Request, DataModel);
                expect(result.status).toBe("success");
                expect(result.data).toBeDefined();
            }
        );

        test.each(masterDataModules)(
            "should fail to create record in $module when validation fails", 
            async ({ invalidPayload }) => {
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    body: { ...invalidPayload } 
                };
                const DataModel = {
                    create: jest.fn().mockRejectedValue(new Error("Validation Error"))
                };

                const result = await CreateService(Request, DataModel);
                expect(result.status).toBe("fail");
            }
        );

        test.each(masterDataModules)(
            "should handle database error during creation in $module", 
            async ({ payload }) => {
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    body: { ...payload } 
                };
                const DataModel = {
                    create: jest.fn().mockRejectedValue(new Error("Database Timeout"))
                };

                const result = await CreateService(Request, DataModel);
                expect(result.status).toBe("fail");
            }
        );
    });

    /* ========================================================================== */
    /* 2. SKENARIO READ (GET)                                                     */
    /* ========================================================================== */
    describe("2. Read / Details Operations", () => {
        
        test.each(masterDataModules)(
            "should successfully fetch data details by ID for $module", 
            async ({ payload }) => {
                // PERBAIKAN: Sediakan properti headers & params lengkap
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "60d5ecb8b4259b1d1f84d111" } 
                };
                const DataModel = {
                    aggregate: jest.fn().mockResolvedValue([payload])
                };

                const result = await DetailsByIDService(Request, DataModel);
                expect(result.status).toBe("success");
                expect(result.data).toBeDefined();
            }
        );

        test.each(masterDataModules)(
            "should return fail when record ID in $module is not found", 
            async () => {
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "non_existent_id" } 
                };
                const DataModel = {
                    aggregate: jest.fn().mockResolvedValue([])
                };

                const result = await DetailsByIDService(Request, DataModel);
                expect(result.status).toBe("fail");
            }
        );
    });

    /* ========================================================================== */
    /* 3. SKENARIO UPDATE (PUT)                                                   */
    /* ========================================================================== */
    describe("3. Update Operations", () => {
        
        test.each(masterDataModules)(
            "should successfully update record in $module", 
            async ({ updatePayload }) => {
                // PERBAIKAN: Sediakan properti headers, params, dan body lengkap
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "60d5ecb8b4259b1d1f84d111" },
                    body: { ...updatePayload } 
                };
                const DataModel = {
                    updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
                };

                const result = await UpdateService(Request, DataModel);
                expect(result.status).toBe("success");
            }
        );

        test.each(masterDataModules)(
            "should handle database error during update in $module", 
            async ({ updatePayload }) => {
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "60d5ecb8b4259b1d1f84d111" },
                    body: { ...updatePayload } 
                };
                const DataModel = {
                    updateOne: jest.fn().mockRejectedValue(new Error("Database Write Error"))
                };

                const result = await UpdateService(Request, DataModel);
                expect(result.status).toBe("fail");
            }
        );
    });

    /* ========================================================================== */
    /* 4. SKENARIO DELETE (DELETE)                                                */
    /* ========================================================================== */
    describe("4. Delete Operations", () => {
        
        test.each(masterDataModules)(
            "should successfully delete record from $module", 
            async () => {
                // PERBAIKAN: Sediakan properti headers dan params lengkap
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "60d5ecb8b4259b1d1f84d111" } 
                };
                const DataModel = {
                    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 })
                };

                const result = await DeleteService(Request, DataModel);
                expect(result.status).toBe("success");
            }
        );

        test.each(masterDataModules)(
            "should handle database error during deletion in $module", 
            async () => {
                const Request = { 
                    headers: { email: "admin@gmail.com" },
                    params: { id: "60d5ecb8b4259b1d1f84d111" } 
                };
                const DataModel = {
                    deleteMany: jest.fn().mockRejectedValue(new Error("Constraint Error"))
                };

                const result = await DeleteService(Request, DataModel);
                expect(result.status).toBe("fail");
            }
        );
    });
});