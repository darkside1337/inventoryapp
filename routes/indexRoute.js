const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const locals = {
    title: "StackTrack 📦",
    description: "A CRUD inventory application made using MongoDB & Express! ",
  };
  res.render("index", { locals });
});

module.exports = router;
