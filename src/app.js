const express = require("express");
const healthRoutes = require("./routes/health.routes");
const filesRoutes = require("./routes/files.routes");
const requestLogger = require("./middleware/requestLogger");
const cors = require("cors");

const app = express();
app.use(express.json());

// Logger de requests
app.use(requestLogger);

//middleware de CORS configurado segun entorno
const NODE_ENV = process.env.NODE_ENV || "development";
const LOCAL_FRONTEND_URL =
  process.env.LOCAL_FRONTEND_URL || "http://localhost:3001";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (NODE_ENV === "development") {
  app.use(
    cors({
      origin: LOCAL_FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
      ],
      optionsSuccessStatus: 204,
    }),
  );
} else if (allowedOrigins.length > 0) {
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));
}

// rutas
app.use("/", healthRoutes);

app.use("/files", filesRoutes);

//handler de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
