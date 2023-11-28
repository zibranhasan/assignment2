import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";
//parsers
app.use(express.json());
app.use(cors());

//api/v1/
//application routes
app.use("/api", UserRoutes);

export default app;
