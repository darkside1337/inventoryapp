const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5001;
const categoriesRoutes = require("./routes/categoriesRoutes");
const itemRoutes = require("./routes/itemRoutes");
const homepageRoute = require("./routes/indexRoute");
const expressLayouts = require("express-ejs-layouts");
const dbConnect = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const populateDb = require("./populatedb");
const methodOverride = require("method-override");
/* ---------------------------- connect to database ---------------------------- */
dbConnect();
/* ------------------------------ static files ------------------------------ */
app.use(express.static("public"));
/* ------------------------------- middleware ------------------------------- */
app.use(methodOverride("_method"));
/* ------------------------------- VIEW ENGINE ------------------------------ */
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* --------------------------------- ROUTES --------------------------------- */
app.use("/", homepageRoute);
app.use("/items", itemRoutes);
app.use("/categories", categoriesRoutes);
/* ------------------------- default route not found ------------------------ */
app.use((req, res, next) => {
  res.status(404).send("404 Page Not Found");
});
/* ------------------------------ errorHandler ------------------------------ */
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
