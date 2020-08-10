// npm imports
const express = require("express");
const next = require("next");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// own imports
const authRoute = require("./server/routers/authRoute");
const config = require("./config");

// config
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  mongoose.connect(
    config.dbAddress,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => console.log("db connected : ", err ?? "no err")
  );
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use("/api", authRoute);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
