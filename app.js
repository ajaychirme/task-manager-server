import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<h1>Task Manager Backend ...</h1>");
});
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
const PORT = process.env.PORT || 6001;
mongoose
  .connect(
    `mongodb+srv://${process.env.USERID}:${process.env.PASSWORD}@task-manager-cluster.hruyphh.mongodb.net/task-manager-db?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
