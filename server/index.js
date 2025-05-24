const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const databaseConnect = require("./config/database.js");

const authRouter = require("./routes/authRoute.js");
const courseRouter = require("./routes/courseRoute.js");
const purchaseRoutes = require("./routes/purchaseRoutes.js");
const profileRoutes = require('./routes/profileRoute.js');
const simpleAiRoutes = require('./routes/simpleAi');
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://konyaereglisatis.com','https://konyaereglisatis.com'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/profile",profileRoutes)
app.use('/api', simpleAiRoutes);
// Start server
const PORT = process.env.PORT || 5000;
databaseConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

