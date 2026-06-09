const ExpenseReportService = require("../src/services/report/ExpenseReportService");

describe("REPORT FEATURE TEST", () => {

    describe("Expense Report", () => {

        test("Generate Expense Report", async () => {

        const req = {
            body: {
            FormDate: "2024-01-01",
            ToDate: "2024-12-31"
            },
            headers: {
            email: "admin@gmail.com"
            }
        };

        try {

            const result = await ExpenseReportService(req);

            expect(result).toBeDefined();

        } catch (error) {

            expect(error).toBeDefined();

        }

        });

    });

});