const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/emotions", require("./routes/emotionRoutes"));
app.use("/api/relaxations", require("./routes/relaxationRoutes"));
app.use("/api/educationMaterials", require("./routes/educationMaterialRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/emotionEntries", require("./routes/emotionEntryRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
