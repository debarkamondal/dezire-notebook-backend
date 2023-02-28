const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

connectToMongo();

app.use(express.json());
app.use(cors());

// Routes available
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
