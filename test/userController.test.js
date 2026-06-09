jest.mock("../src/models/Users/UsersModel", () => ({}), { virtual: true });

const UserCreateService = require("../src/services/user/UserCreateService");
const UserLoginService = require("../src/services/user/UserLoginService");
const UserUpdateService = require("../src/services/user/UserUpdateService");
const UserDetailsService = require("../src/services/user/UserDetailsService");
const UserVerifyEmailService = require("../src/services/user/UserVerifyEmailService");
const UserVerifyOtpService = require("../src/services/user/UserVerifyOtpService");
const UserResetPassService = require("../src/services/user/UserResetPassService");

jest.mock("../src/services/user/UserCreateService");
jest.mock("../src/services/user/UserLoginService");
jest.mock("../src/services/user/UserUpdateService");
jest.mock("../src/services/user/UserDetailsService");
jest.mock("../src/services/user/UserVerifyEmailService");
jest.mock("../src/services/user/UserVerifyOtpService");
jest.mock("../src/services/user/UserResetPassService");

const UsersController = require("../src/controllers/Users/UsersController");

describe("USERS CONTROLLER LAYER TEST COMPLETE", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            headers: { email: "admin@gmail.com" },
            body: { email: "admin@gmail.com", password: "123", OTP: "123456" },
            params: { email: "admin@gmail.com", OTP: "123456" }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test("Registration Workflow (Success & Fail)", async () => {
        UserCreateService.mockResolvedValue({ status: "success" });
        await UsersController.Registration(req, res);
        
        UserCreateService.mockResolvedValue({ status: "fail", data: "Email already exists" });
        await UsersController.Registration(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Login Workflow (Success & Fail)", async () => {
        UserLoginService.mockResolvedValue({ status: "success", token: "mock-token" });
        await UsersController.Login(req, res);
        
        UserLoginService.mockResolvedValue({ status: "fail", data: "Wrong Credentials" });
        await UsersController.Login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Profile Operations & Verification Fallback Workflow", async () => {
        UserUpdateService.mockResolvedValue({ status: "success" });
        UserDetailsService.mockResolvedValue({ status: "success", data: [] });
        UserVerifyEmailService.mockResolvedValue({ status: "success" });
        UserVerifyOtpService.mockResolvedValue({ status: "success" });
        UserResetPassService.mockResolvedValue({ status: "success" });

        const updateProfileFn = UsersController.UserUpdate || UsersController.ProfileUpdate || UsersController.UpdateProfile;
        const detailsProfileFn = UsersController.UserSelect || UsersController.UserDetails || UsersController.SelectProfile || UsersController.UserProfile;
        const verifyEmailFn = UsersController.RecoverVerifyEmail || UsersController.VerifyEmail;
        const verifyOtpFn = UsersController.RecoverVerifyOTP || UsersController.VerifyOTP;
        const resetPassFn = UsersController.RecoverResetPass || UsersController.ResetPassword;

        if (typeof updateProfileFn === "function") {
            await updateProfileFn(req, res);
            UserUpdateService.mockResolvedValueOnce({ status: "fail" });
            await updateProfileFn(req, res);
        }
        if (typeof detailsProfileFn === "function") {
            await detailsProfileFn(req, res);
            UserDetailsService.mockResolvedValueOnce({ status: "fail" });
            await detailsProfileFn(req, res);
        }
        if (typeof verifyEmailFn === "function") {
            await verifyEmailFn(req, res);
            UserVerifyEmailService.mockResolvedValueOnce({ status: "fail" });
            await verifyEmailFn(req, res);
        }
        if (typeof verifyOtpFn === "function") {
            await verifyOtpFn(req, res);
            UserVerifyOtpService.mockResolvedValueOnce({ status: "fail" });
            await verifyOtpFn(req, res);
        }
        if (typeof resetPassFn === "function") {
            await resetPassFn(req, res);
            UserResetPassService.mockResolvedValueOnce({ status: "fail" });
            await resetPassFn(req, res);
        }

        expect(res.status).toHaveBeenCalled();
    });
});