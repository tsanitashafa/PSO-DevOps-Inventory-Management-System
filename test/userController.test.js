jest.mock("../src/models/Users/UsersModel", () => ({}), { virtual: true });

const UserCreateService = require("../src/services/user/UserCreateService");
const UserLoginService = require("../src/services/user/UserLoginService");
const UserUpdateService = require("../src/services/user/UserUpdateService");

jest.mock("../src/services/user/UserCreateService");
jest.mock("../src/services/user/UserLoginService");
jest.mock("../src/services/user/UserUpdateService");

const UsersController = require("../src/controllers/Users/UsersController");

describe("USERS CONTROLLER LAYER TEST", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            headers: { email: "admin@gmail.com" },
            body: { email: "admin@gmail.com", password: "123" }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test("should successfully trigger Registration via Controller", async () => {
        UserCreateService.mockResolvedValue({ status: "success" });
        await UsersController.Registration(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should successfully trigger Login via Controller", async () => {
        UserLoginService.mockResolvedValue({ status: "success", token: "mock" });
        await UsersController.Login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should successfully trigger Profile Update via Controller", async () => {
        UserUpdateService.mockResolvedValue({ status: "success" });
        
        // DETEKSI OTOMATIS: Mencari nama fungsi ekspor profil update yang tepat di file aslimu
        const updateProfileFn = UsersController.UserUpdate || UsersController.ProfileUpdate || UsersController.UpdateProfile;
        
        if (typeof updateProfileFn === "function") {
            await updateProfileFn(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        } else {
            throw new Error("Fungsi update profil tidak ditemukan di file UsersController kamu.");
        }
    });

    test("should handle database error during Registration safely", async () => {
        UserCreateService.mockResolvedValue({ status: "fail", data: "Email already exists" });
        await UsersController.Registration(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle validation failure during Login safely", async () => {
        UserLoginService.mockResolvedValue({ status: "fail", data: "Wrong Password" });
        await UsersController.Login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});