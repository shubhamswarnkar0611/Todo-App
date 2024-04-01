const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToMongo = require("./utils/database")
const usersRouter = require("./routes/usersR");
const tasksRouter = require("./routes/tasksR");
const PORT = 4001;

connectToMongo();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(usersRouter);
app.use(tasksRouter);

app.listen(PORT);
