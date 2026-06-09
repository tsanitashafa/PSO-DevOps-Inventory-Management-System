const UserLoginService = require("../src/services/user/UserLoginService");
const UserResetPassService = require("../src/services/user/UserResetPassService");

jest.mock("../src/utilities/CreateToken", () =>
    jest.fn(() => "mock-token")
);

describe("Auth Service Test", () => {
    describe("Login", () => {
        test("should login successfully", async () => {
            const req = {
                body: {
                email: "admin@gmail.com",
                password: "123456"
                }
            };

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([
                {
                email: "admin@gmail.com"
                }
            ])
        };

        const result = await UserLoginService(
            req,
            MockModel
        );

        expect(result.status).toBe("success");
    });

    test("should fail when credentials invalid", async () => {
        const req = {
            body: {
            email: "wrong@gmail.com",
            password: "wrong"
            }
        };

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([])
        };

        const result = await UserLoginService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");
    });

    test("should handle database error", async () => {
        const req = {
            body: {}
        };

        const MockModel = {
            aggregate: jest.fn().mockRejectedValue(
            new Error("Database Error")
            )
        };

        const result = await UserLoginService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");
    });
});

describe("Reset Password", () => {

    test("should reset password successfully", async () => {

        const req = {
            body: {
            email: "admin@gmail.com",
            OTP: "123456",
            password: "newpassword"
            }
        };

        const MockModel = {
            updateOne: jest.fn().mockResolvedValue({
            modifiedCount: 1
            })
        };

        const result = await UserResetPassService(
            req,
            MockModel
        );

        expect(result.status).toBe("success");
    });

    test("should fail when email empty", async () => {

        const req = {
            body: {
            email: "",
            OTP: "123456",
            password: "newpassword"
            }
        };

        const MockModel = {};

        const result = await UserResetPassService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");
    });

    test("should fail when password empty", async () => {
        const req = {
            body: {
            email: "admin@gmail.com",
            OTP: "123456",
            password: ""
            }
        };

        const MockModel = {};

        const result = await UserResetPassService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");

    });

    test("should handle database error", async () => {

        const req = {
            body: {
            email: "admin@gmail.com",
            OTP: "123456",
            password: "123"
            }
        };

        const MockModel = {
            updateOne: jest.fn().mockRejectedValue(
            new Error("Database Error")
            )
        };

        const result = await UserResetPassService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");

        });

    });

});