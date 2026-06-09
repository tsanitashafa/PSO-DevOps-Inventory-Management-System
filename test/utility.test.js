const CreateToken = require("../src/utilities/CreateToken");
const SendEmailUtility = require("../src/utilities/SendEmailUtility");
const nodemailer = require("nodemailer");

jest.mock("nodemailer");

describe("UTILITY CONFIGURATION TEST", () => {
    test("should successfully generate a JWT token string", async () => {
        const data = { email: "admin@gmail.com", id: "123" };
        const token = await CreateToken(data);
        expect(token).toBeDefined();
    });

    test("should trigger send email workflow", async () => {
        const mockSendMail = jest.fn().mockResolvedValue({ messageId: "mock-id" });
        nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

        const result = await SendEmailUtility("target@mail.com", "OTP Code", "Your code is 123456");
        expect(result).toBeDefined();
    });
});