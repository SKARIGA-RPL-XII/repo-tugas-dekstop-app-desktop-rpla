import "dotenv/config";
import express from "express";
import { route } from "./routes/route.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request hit:", req.method, req.url);
  next();
});

app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("server running PORT:3000");
});
