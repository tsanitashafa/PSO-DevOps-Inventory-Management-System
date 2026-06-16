const dns = require("dns");

// Paksa Node.js memakai DNS Google dan Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = require("./app");

const PORT = 8080;

/* -------------------------------------------------------------------------- */
/*                                 Start Server                               */
/* -------------------------------------------------------------------------- */
app.listen(PORT, function () {
  console.log(`Application is Running on port: ${PORT}`);
});