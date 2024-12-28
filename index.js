const express = require("express");
const connectwithdb = require("./config/database.js"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

const userRoutes = require("./routes/user");
app.use("/api/v1", userRoutes);

connectwithdb();

app.listen(PORT, () => {
  console.log(`App is started at port no ${PORT}`);
});

app.get("/", (req, res) => {
  res.send('<h1>This is my homepage</h1>');
});
