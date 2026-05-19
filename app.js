const cors = require("cors");
const express = require("express");

const routes = require("./routes");
const { errorHandler } = require("./utils/errorHandler");
const { uploadsDir } = require("./utils/upload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

app.get("/", (req, res) => {
  res.json({
    message: "Homepage API is running",
    uploads: "/uploads/file-name.jpg",
  });
});

app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
