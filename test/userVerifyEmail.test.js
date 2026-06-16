jest.mock("../src/models/Users/OTPSModel", () => ({
  create: jest.fn(),
}));

jest.mock("../src/utilities/SendEmailUtility", () => jest.fn());

const UserVerifyEmailService = require("../src/services/user/UserVerifyEmailService");
const OTPSModel = require("../src/models/Users/OTPSModel");
const SendEmailUtility = require("../src/utilities/SendEmailUtility");

describe("UserVerifyEmailService - 100% Max Branch Coverage Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    OTPSModel.create.mockResolvedValue({
      email: "tsanita@mail.com",
      otp: "123456",
    });

    SendEmailUtility.mockResolvedValue(true);
  });

  test("should successfully verify email and generate OTP when user exists", async () => {
    const Request = {
      params: { email: "tsanita@mail.com" },
    };

    const DataModel = {
      findOne: jest.fn().mockResolvedValue({
        email: "tsanita@mail.com",
      }),
    };

    const result = await UserVerifyEmailService(Request, DataModel);

    expect(result.status).toBe("success");
    expect(OTPSModel.create).toHaveBeenCalled();
    expect(SendEmailUtility).toHaveBeenCalled();
  });

  test("should return fail when email is not registered", async () => {
    const Request = {
      params: { email: "tidak_terdaftar@mail.com" },
    };

    const DataModel = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const result = await UserVerifyEmailService(Request, DataModel);

    expect(result.status).toBe("fail");
  });

  test("should handle database internal crash in catch block", async () => {
    const Request = {
      params: { email: "tsanita@mail.com" },
    };

    const DataModel = {
      findOne: jest.fn().mockRejectedValue(new Error("Database Connection Lost")),
    };

    const result = await UserVerifyEmailService(Request, DataModel);

    expect(result.status).toBe("fail");
  });
});