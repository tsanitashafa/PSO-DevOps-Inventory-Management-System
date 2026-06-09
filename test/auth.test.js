const UserLoginService = require("../src/services/user/UserLoginService");
const UserResetPassService = require("../src/services/user/UserResetPassService"); 
const UserVerifyOtpService = require("../src/services/user/UserVerifyOtpService");

jest.mock("../src/utilities/CreateToken", () => {
    return jest.fn(() => "mock-token");
});

function debugResult(testName, result) {
    console.log("\n====================");
    console.log(testName);
    console.log(result);
    console.log("====================\n");
}

describe("AUTH SERVICE TEST", () => {

    describe("User Login", () => {

        test("Login Success", async () => {

        const req = {
            body: {
            email: "admin@gmail.com",
            password: "123456"
            }
        };

        const MockModel = {
            aggregate: jest.fn().mockResolvedValue([
            {
                email: "admin@gmail.com",
                firstName: "Admin"
            }
            ])
        };

        const result = await UserLoginService(req, MockModel);

        debugResult("Login Success", result);

        expect(result.status).toBe("success");

        });

        test("Login Failed - Invalid Credential", async () => {

        const req = {
            params: {
                email: "admin@gmail.com",
                otp: "wrong_otp"
            }
        };

        const MockModel = {
            // Simulasi jika aggregate mengembalikan array kosong (OTP tidak ditemukan)
            aggregate: jest.fn().mockResolvedValue([])
        };

        const result = await UserLoginService(req, MockModel);

        debugResult(
            "Login Failed - Invalid Credential",
            result
        );

        expect(result.status).toBe("fail");

        });

        test("Login Failed - Database Error", async () => {

        const req = {
            params: {
                email: "admin@gmail.com",
                otp: "123456"
            }
        };

        const MockModel = {
            aggregate: jest.fn().mockRejectedValue(
                new Error("Database connection timed out")
            )
        };

        const result = await UserLoginService(req, MockModel);

        debugResult(
            "Login Failed - Database Error",
            result
        );

        expect(result.status).toBe("fail");

        });

    });

    describe("Reset Password", () => {

        test("Reset Password Success", async () => {

        const req = {
            body: {
            email: "admin@gmail.com",
            password: "newpassword"
            }
        };

        const MockModel = {
            findOne: jest.fn().mockResolvedValue({
            email: "admin@gmail.com"
            }),
            updateOne: jest.fn().mockResolvedValue({
            modifiedCount: 1
            })
        };

        const result = await UserResetPassService(
            req,
            MockModel
        );

        debugResult(
            "Reset Password Success",
            result
        );

        expect(result.status).toBe("success");

        });

        test("Reset Password Failed - User Not Found", async () => {

        const req = {
            body: {
            email: "unknown@gmail.com",
            password: "123456"
            }
        };

        const MockModel = {
            findOne: jest.fn().mockResolvedValue(null)
        };

        const result = await UserResetPassService(
            req,
            MockModel
        );

        debugResult(
            "Reset Password Failed - User Not Found",
            result
        );

        expect(result.status).toBe("fail");

        });

        test("Reset Password Failed - Database Error", async () => {

        const req = {
            body: {
            email: "admin@gmail.com",
            password: "123456"
            }
        };

        const MockModel = {
            findOne: jest.fn().mockRejectedValue(
            new Error("Database Error")
            )
        };

        const result = await UserResetPassService(
            req,
            MockModel
        );

        debugResult(
            "Reset Password Failed - Database Error",
            result
        );

        expect(result.status).toBe("fail");

        });

    });

});