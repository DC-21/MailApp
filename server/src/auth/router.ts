import { Router } from "express";
import { AuthCollection } from "./collection";

const authRouter = Router();
const authCollection = new AuthCollection();

authRouter.post("/signup", authCollection.Register);
authRouter.post("/signin", authCollection.Login);

export default authRouter;
