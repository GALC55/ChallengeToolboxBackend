const express = require("express");
const router = express.Router();
const {
  getFilesData,
  getFilesList,
} = require("../controllers/files.controllers");

router.get("/data", getFilesData);
router.get("/list", getFilesList);

module.exports = router;
