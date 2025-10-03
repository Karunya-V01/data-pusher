const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerSetup = require('./swagger');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/accounts", require("./routes/account"));
app.use("/destinations", require("./routes/destination"));
app.use("/server", require("./routes/server"));
app.use("/logs", require("./routes/log"));

app.get("/", (req, res) => {
    res.send({ message: "🚀 Data Pusher API Running..." });
  });
  
  swaggerSetup(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
