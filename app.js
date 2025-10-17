/**
 * Application Entry Point (Express App Configuration)
 *
 * Responsibilities:
 * - Load security middlewares (helmet, cors, sanitizer, etc.)
 * - Configure body parsers and rate limiting
 * - Connect to MongoDB
 * - Mount API routes
 * - Handle 404 (Not Found) responses
 */

const express = require("express");
const mongoose = require("mongoose");

// Security Middlewares
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Routes
const router = require("./src/routes/api");

// Initialize Express
const app = express();

/* -------------------------------------------------------------------------- */
/*                          Security & Middleware Setup                       */
/* -------------------------------------------------------------------------- */

// Enable CORS for cross-origin requests
app.use(cors());

// Set secure HTTP headers
app.use(helmet());

// Sanitize request data against NoSQL injection
// ⚠️ In Express 5, req.query is read-only, so sanitize only body/params safely
app.use(
  mongoSanitize({
    replaceWith: "_",
    onSanitize: ({ key }) => {
      console.warn(`Sanitized key: ${key}`);
    },
  })
);

// Prevent cross-site scripting (XSS) attacks
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Parse JSON and URL-encoded data (limit: 50MB)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Apply request rate limiting (per IP)
app.use(
  rateLimit({
    windowMs: 1560 * 1000, // 26 minutes
    max: 3000, // limit each IP to 3000 requests per windowMs
    standardHeaders: true, // return rate limit info in RateLimit-* headers
    legacyHeaders: false, // disable X-RateLimit-* headers
  })
);

/* -------------------------------------------------------------------------- */
/*                             Database Connection                            */
/* -------------------------------------------------------------------------- */

const MONGO_URI =
  "mongodb+srv://<username>:<password>@cluster0.vidqntm.mongodb.net/inventory_management_system?retryWrites=true&w=majority";

const MONGO_OPTIONS = {
  user: "rmshanto786",
  pass: "shanto786",
  autoIndex: true,
};

mongoose
  .connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/* -------------------------------------------------------------------------- */
/*                              Mount API Route                                   */
/* -------------------------------------------------------------------------- */
app.use("/api/v1", router); // Mount API routes at /api/v1

// Fallback route (404 handler)
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not Found",
  });
});

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

module.exports = app;
