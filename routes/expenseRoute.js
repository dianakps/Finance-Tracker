import express from "express";
import {
  create,
  update,
  fetch,
  remove,
} from "../controller/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/create", create);
expenseRouter.post("/update", update);
expenseRouter.get("/fetch", fetch);
expenseRouter.delete("/remove", remove);

export default expenseRouter;
