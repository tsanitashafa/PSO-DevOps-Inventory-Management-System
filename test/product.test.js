const ListTwoJoinService = require("../src/services/common/ListTwoJoinService");
const CheckAssociateService = require("../src/services/common/CheckAssociateService");

describe("PRODUCT FEATURE TEST", () => {

    describe("Product List", () => {

        test("Product List Success", async () => {

        const req = {
            headers: {
            email: "admin@gmail.com"
            },
            params: {
            pageNo: 1,
            perPage: 10,
            searchKeyword: "Laptop"
            }
        };

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([
            {
                Name: "Laptop"
            }
            ])
        };

        const result = await ListTwoJoinService(
            req,
            MockModel,
            [],
            {},
            {}
        );

        expect(result.status).toBe("success");

        });

    });

    describe("Product Association", () => {

        test("Associated Product Exists", async () => {

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([
            {
                ProductID: "1"
            }
            ])
        };

        const result = await CheckAssociateService(
            {
            ProductID: "1"
            },
            MockModel
        );

        expect(result).toBe(true);

        });

        test("Associated Product Not Exists", async () => {

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([])
        };

        const result = await CheckAssociateService(
            {
            ProductID: "1"
            },
            MockModel
        );

        expect(result).toBe(false);

        });

    });

});