require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./Startup/db");
const cors = require("cors");
const allRoutes = require("./Route/allRoutes");

//Db connection
connectToDB();

app.use(express.json());
app.use(
  cors({
    origin: `${process.env.WEB_URL}`,
  })
);

app.use("/api", allRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
});
