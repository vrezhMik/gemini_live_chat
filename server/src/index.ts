import express from "express";
import bodyParser from "body-parser";
import chatRoutes from "./routes/chatRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./utils/errorHandler";
import { environment } from "./config/environment";

const app = express();

app.use(bodyParser.json());
app.use(authMiddleware);

app.use("/", chatRoutes);

app.use(errorHandler);

app.listen(environment.port, () => {
  console.log(`Server running at http://localhost:${environment.port}`);
});
