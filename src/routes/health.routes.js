const { Router } = require("express");

const router = Router();

router.get("/health", async (req, res) => {
  console.log(content);

  res.status(200).json({
    status: "ok",
  });
});

module.exports = router;
