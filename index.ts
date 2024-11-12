import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
dotenv.config();
const PORT = process.env.PORT || 4000;
import usersRouter from "./routes/users.route";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swaggerSpec = YAML.load("./config/swagger.yaml");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({message:"Server is healthy."})
});

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
