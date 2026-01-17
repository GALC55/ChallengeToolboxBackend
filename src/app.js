const express = require("express");
const healthRoutes = require("./routes/health.routes");
const filesRoutes = require("./routes/files.routes");

const app = express();
app.use(express.json());

// routes
app.use("/", healthRoutes);

app.use("/files", filesRoutes);

module.exports = app;
