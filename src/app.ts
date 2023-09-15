import express from "express";
import { AnimalsApi } from "./animal.api";
import { Animals } from "./app.interface";

const app = express();
const port = 3000;
const sampleAnimals: Animals[] = [
  { name: "Toucan", id: "fst353" },
  { name: "Penguin", id: "sdf234" },
];

app.use(express.json());

app.use("*", (req: any, res: any, next: any) => {
  req.sampleAnimals = sampleAnimals;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Express API!");
});

app.use("/api/animals", new AnimalsApi().routes());

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
