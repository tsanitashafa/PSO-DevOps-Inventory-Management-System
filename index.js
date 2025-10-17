const app = require("./app");
const PORT = 8080;
/* -------------------------------------------------------------------------- */
/*                                 Start Server                               */
/* -------------------------------------------------------------------------- */
app.listen(PORT, function () {
  console.log(`Application is Running on port: ${PORT}`);
});
