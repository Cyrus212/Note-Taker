const express = require("express");
const path = require("path");
const notes = require('./routes/api/notes');


const api = require("./routes/index");

const PORT = process.env.PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', notes);

app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", async (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);
