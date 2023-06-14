import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { isObject } from "lodash";
import path from "path";
import { ZodError } from "zod";
import routes from "./app/routes";
import { AppDataSource } from "./data-source";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("in error handler", err);
  console.log("res.headersSent", res.headersSent);

  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ZodError) {
    res.status(400).json(err);
  }
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  }
  if (isObject(err) && "detail" in err) {
    console.log("err", err);

    console.log("detail", err.detail);

    res.status(400).json({ error: err.detail });
  }
  if (typeof err === "string") {
    res.status(400).json({ error: err });
  }
  res.status(500).send(err);
}

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use("/static", express.static(path.join(__dirname, "..", "uploads")));
    app.use(cors());
    app.use(express.json());

    app.use("/server-api", ...routes);

    app.use(errorHandler);

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));

export {};
