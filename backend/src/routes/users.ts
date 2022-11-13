import auth from "../middleware/auth.middleware";
import { NextFunction, Request, Response, Router } from "express";
import UserService from "../services/users.service";
import { AuthRequest } from "../types";

const usersRouter = Router();

usersRouter.post(
  "/auth",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body;
      const token = await UserService.getToken(login, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
);
usersRouter.get(
  "/auth",
  auth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const login = req.user;
      const payload = await UserService.getAuthUser(login);
      res.json(payload);
    } catch (error) {
      next(error);
    }
  }
);

export default usersRouter;
