const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/assets/pages/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
