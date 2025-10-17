const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                         JWT Token Creation                                 */
/* -------------------------------------------------------------------------- */
const CreateToken = async (data) => {
  const Payload = {
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 7, // 7 day expiration
    // iat: Math.floor(Date.now() / 1000), // Issued at time
    data: data,
  };
  return await jwt.sign(Payload, "SecretKey123456789");
};
module.exports = CreateToken;
