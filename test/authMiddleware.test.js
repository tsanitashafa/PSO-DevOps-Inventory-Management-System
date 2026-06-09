const authMiddleware = require("../src/middlewares/AuthVerifyMiddleware");
const jwt = require("jsonwebtoken");

// Mock library jsonwebtoken
jest.mock("jsonwebtoken");

describe("AUTH VERIFY MIDDLEWARE TEST", () => {

    test("Should return 401 when token is missing", async () => {
        const req = {
        headers: {},
        };

        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        const next = jest.fn();

        await authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.json).toHaveBeenCalledWith({
        status: "unauthorized",
        data: "Token tidak ditemukan",
        });

        expect(next).not.toHaveBeenCalled();
    });

    test("Should return 401 when token is invalid", async () => {
        const req = {
        headers: {
            token: "invalid-token",
        },
        };

        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        const next = jest.fn();

        jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error("Invalid Token"), null);
        });

        await authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.json).toHaveBeenCalledWith({
        status: "unauthorized",
        data: "Error: Invalid Token",
        });

        expect(next).not.toHaveBeenCalled();
    });

    test("Should call next() when token is valid", async () => {
        const req = {
        headers: {
            token: "valid-token",
        },
        };

        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        const next = jest.fn();

        jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, {
            data: "admin@gmail.com",
        });
        });

        await authMiddleware(req, res, next);

        expect(req.email).toBe("admin@gmail.com");

        expect(req.headers.email).toBe("admin@gmail.com");

        expect(next).toHaveBeenCalled();
    });

});