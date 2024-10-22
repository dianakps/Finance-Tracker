import express from "express";
import {
  create,
  fetch,
  update,
  remove,
} from "../controller/incomeController.js";

const incomeRoute = express.Router();

incomeRoute.post("/create", create);
incomeRoute.get("/fetch", fetch);
incomeRoute.post("/update", update);
incomeRoute.delete("/remove", remove);

export default incomeRoute;
