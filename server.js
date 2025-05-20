const express = require("express");
const app = express();
const db = require("./db");



// Add middleware to parse JSON request bodies
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the Goa, how can I help you?");
});





//import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000:---");
});
