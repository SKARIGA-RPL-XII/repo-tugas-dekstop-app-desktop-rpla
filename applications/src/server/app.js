import express from "express";
import { route } from "./routes/route.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());
app.use("/api", route);

app.listen(port, () => {
  console.log("server running PORT:3000");
});
