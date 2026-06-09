const UserVerifyEmailService = require("../src/services/user/UserVerifyEmailService");

// 1. MEMBAJAK UTILITY EMAIL SECARA GLOBAL
jest.mock("../src/utilities/SendEmailUtility", () => {
    return jest.fn().mockResolvedValue(true); 
});

describe("UserVerifyEmailService - 100% Max Branch Coverage Suite", () => {

    /* ========================================================================== */
    /* JALUR UTAMA 1: EMAIL BERHASIL DITEMUKAN (HAPPY PATH)                       */
    /* ========================================================================== */
    test("should successfully verify email and generate OTP when user exists", async () => {
        const Request = {
            params: { email: "tsanita@mail.com" }
        };

        // Mengamankan DataModel user agar merespons sukses untuk seluruh jenis method Mongoose
        const DataModel = {
            aggregate: jest.fn().mockResolvedValue([{ email: "tsanita@mail.com" }]),
            findOne: jest.fn().mockResolvedValue({ email: "tsanita@mail.com" }),
            find: jest.fn().mockResolvedValue([{ email: "tsanita@mail.com" }])
        };

        // ⚠️ KUNCI UTAMA: Lengkapi seluruh metode query pangkalan data yang potensial dipanggil oleh service
        const OTPModel = {
            create: jest.fn().mockResolvedValue({ email: "tsanita@mail.com", otp: "123456" }),
            findOne: jest.fn().mockResolvedValue({ email: "tsanita@mail.com", otp: "123456", status: 0 }),
            updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
            updateMany: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
            countDocuments: jest.fn().mockResolvedValue(0)
        };

        // Eksekusi service utama
        const result = await UserVerifyEmailService(Request, DataModel, OTPModel);
        
        // Asersi ekspektasi
        expect(result.status).toBe("success");
    });

    /* ========================================================================== */
    /* JALUR UTAMA 2: EMAIL TIDAK DITEMUKAN (BARIS 19)                            */
    /* ========================================================================== */
    test("should return fail when email is not registered (Branch: User === null / baris 19)", async () => {
        const Request = {
            params: { email: "tidak_terdaftar@mail.com" }
        };

        const DataModel = {
            aggregate: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            find: jest.fn().mockResolvedValue([])
        };

        const result = await UserVerifyEmailService(Request, DataModel);
        expect(result.status).toBe("fail");
    });

    /* ========================================================================== */
    /* JALUR UTAMA 3: DATABASE ERROR / CRASH (BARIS 31-46)                        */
    /* ========================================================================== */
    test("should handle database internal crash in catch block (Branch: Catch / baris 31-46)", async () => {
        const Request = {
            params: { email: "tsanita@mail.com" }
        };

        const DataModel = {
            aggregate: jest.fn().mockRejectedValue(new Error("Database Connection Lost")),
            findOne: jest.fn().mockRejectedValue(new Error("Database Connection Lost"))
        };

        const result = await UserVerifyEmailService(Request, DataModel);
        expect(result.status).toBe("fail");
    });
});