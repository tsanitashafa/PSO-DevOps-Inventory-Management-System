const jwt = require("jsonwebtoken");

module.exports = async (Request, Response, Next) => {
  const Token = Request.headers["token"];

  if (!Token) {
    return Response.status(401).json({
      status: "unauthorized",
      data: "Token tidak ditemukan",
    });
  }

  jwt.verify(Token, "SecretKey123456789", (err, decoded) => {
    if (err) {
      return Response.status(401).json({
        status: "unauthorized",
        data: err.toString(),
      });
    }

    const email = decoded["data"];

    // untuk service profile yang tadi kita ubah
    Request.email = email;

    // untuk service lama/dashboard/report yang mungkin masih baca dari headers
    Request.headers["email"] = email;

    Next();
  });
};