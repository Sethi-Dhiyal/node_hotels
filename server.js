const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();



// Add middleware to parse JSON request bodies
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.get("/", function (req, res) {
  res.send("Welcome to the Goa, how can I help you?");
});

//import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 4000:---");
});
