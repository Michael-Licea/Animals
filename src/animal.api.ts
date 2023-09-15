import { Router, Request, Response } from "express";
import * as core from "express-serve-static-core";
import { Animals } from "./app.interface";

export class AnimalsApi {
  api!: core.Router;

  constructor() {}

  routes() {
    this.api = Router();

    // test
    this.api.use((req, res, next) => {
      console.log("Animals");
      next();
    });

    // request for all animals
    this.api.get("/", async (req: Request & any, res: Response, next: any) => {
      res.send(req.sampleAnimals);
    });

    this.api.put(
      "/:id",
      async (req: Request & any, res: Response, next: any) => {
        const id = req.params.id;
        //search sampleAnimals for a animal with a specific id in the url
        let found: number = req.sampleAnimals.findIndex(
          (animal: Animals) => animal.id === id
        );
        // if no animal
        if (!found) res.status(400).send("Animal not found by that Id");
        // update animal
        req.sampleAnimals[found] = { ...req.sampleAnimals[found], ...req.body };
        // send the updated animal
        res.send(req.sampleAnimals[found]);
      }
    );

    // add new animal into sampleAnimals
    this.api.post("", async (req: Request & any, res: Response, next: any) => {
      const newAnimal: Animals = req.body;
      newAnimal.id = idGen(6);
      req.sampleAnimals.push(newAnimal);
      res.send(newAnimal);
    });

    return this.api;
  }
}

function idGen(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
