const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors")

const app = express();

// Connect to Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(morgan('tiny'))
app.use(cors())

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
