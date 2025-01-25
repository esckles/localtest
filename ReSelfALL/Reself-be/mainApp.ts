import { Application, Request, Response } from "express";

export const mainApp = async (app: Application) => {
  //   app.use("/api");
  try {
    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Welcome to my Auth API", status: 200 });
    });
  } catch (error) {
    return error;
  }
};
