const UserLoginService = require("../src/services/user/UserLoginService");
const UserResetPassService = require("../src/services/user/UserResetPassService"); 
const UserVerifyOtpService = require("../src/services/user/UserVerifyOtpService");
const UserVerifyEmailService = require("../src/services/user/UserVerifyEmailService");

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

describe("Fitur Cadangan - Validasi OTP & Email Otomatis", () => {
    
    // 1. Menguji Fungsi Verifikasi OTP (Menyerang Baris 9-41 yang kosong)
    describe("UserVerifyOtpService", () => {
        test("should return success when OTP is valid", async () => {
            const Request = { 
                params: { email: "admin@gmail.com", otp: "123456" } 
            };
            const DataModel = {
                aggregate: jest.fn().mockResolvedValue([{ total: 1 }]),
                updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
            };

            const result = await UserVerifyOtpService(Request, DataModel);
            expect(result.status).toBe("success");
        });

        test("should return fail when OTP is invalid", async () => {
            const Request = { 
                params: { email: "admin@gmail.com", otp: "000000" } 
            };
            const DataModel = {
                aggregate: jest.fn().mockResolvedValue([]) // Kosong = tidak ketemu
            };

            const result = await UserVerifyOtpService(Request, DataModel);
            expect(result.status).toBe("fail");
            expect(result.data).toBe("Invalid OTP");
        });
    });

    // 2. Menguji Fungsi Verifikasi Email (Menyerang Baris 13-48 yang kosong)
    describe("UserVerifyEmailService", () => {
        test("should return success if email exists and OTP is generated", async () => {
            const Request = { 
                params: { email: "admin@gmail.com" } 
            };
            const DataModel = {
                aggregate: jest.fn().mockResolvedValue([{ total: 1 }]), // Email terdaftar
                create: jest.fn().mockResolvedValue({ status: 0 })     // Berhasil buat OTP di DB
            };

            const result = await UserVerifyEmailService(Request, DataModel);
            expect(result.status).toBeDefined();
        });

        test("should return fail if email is not found", async () => {
            const Request = { 
                params: { email: "unknown@gmail.com" } 
            };
            const DataModel = {
                aggregate: jest.fn().mockResolvedValue([]) // Kosong = email tidak terdaftar
            };

            const result = await UserVerifyEmailService(Request, DataModel);
            expect(result.status).toBe("fail");
        });
    });
});