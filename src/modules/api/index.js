import { Router } from "express";
import UserRouter from "../user/user.routes";
import AuthRouter from "../auth/auth.routes";
import * as Controller from "./controller";
const apiRouter = Router();

apiRouter.get("/health", Controller.check);
apiRouter.use("/user", UserRouter);
apiRouter.use("/auth", AuthRouter);

export default apiRouter;
