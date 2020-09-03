// npm imports
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// own imports
const authRoute = require("./server/auth/authRoute");
const uploadRoute = require("./server/uploads/uploadRoute");
const config = require("./config");

// config
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const api = "/api/";

app.prepare().then(() => {
  const server = express();
  // server.use(helmet());
  mongoose.connect(
    config.dbAddress,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => console.log("db connected : ", err ? err : "no err")
  );
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use(`${api}auth`, authRoute);
  server.use(`${api}upload`, uploadRoute);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
