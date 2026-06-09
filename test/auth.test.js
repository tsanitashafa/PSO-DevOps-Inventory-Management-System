const UserLoginService = require("../src/services/user/UserLoginService");
const UserVerifyOtpService = require("../src/services/user/UserVerifyOtpService");

// ... kode test Login tetap biarkan seperti milikmu ...

describe("OTP Verification Service Test", () => {

    test("should verify OTP successfully", async () => {
        // PERBAIKAN 1: Sesuaikan struktur input menjadi params (bukan body)
        const req = {
            params: {
                email: "admin@gmail.com",
                otp: "123456"
            }
        };

        // PERBAIKAN 2: Sediakan mock beruntun untuk aggregate DAN updateOne
        const MockModel = {
            // aggregate harus mengembalikan array berisi objek (agar .length > 0 lolos)
            aggregate: jest.fn().mockResolvedValue([
                { total: 1 }
            ]),
            // updateOne menyusul setelah aggregate lolos
            updateOne: jest.fn().mockResolvedValue({
                modifiedCount: 1
            })
        };

        const result = await UserVerifyOtpService(
            req,
            MockModel
        );

        expect(result.status).toBe("success");
    });

    test("should fail when OTP is invalid / not found", async () => {
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

        const result = await UserVerifyOtpService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");
        expect(result.data).toBe("Invalid OTP");
    });

    test("should handle database error during aggregation", async () => {
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

        const result = await UserVerifyOtpService(
            req,
            MockModel
        );

        expect(result.status).toBe("fail");
    });
});