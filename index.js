import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const URI = // Add your MongoDB URI
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Database is connected succefully");
      app.listen(5000, () => {
        console.log(`CORS-enabled web server listening on port 5000`);
      });
    })
    .catch((error) => console.log(error));

app.use("/income", incomeRoute);
app.use("/expense", expenseRouter);
