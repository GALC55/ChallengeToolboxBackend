// Load environment variables from .env (development). Requires `dotenv`.
try {
  require("dotenv").config();
} catch (e) {
  // dotenv not installed or failed to load; continue without crashing
}

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
