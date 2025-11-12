import { Router } from "express";
import { loginAdmin } from "../controllers/adminControllers";

export const AdminRouter = Router();

AdminRouter.post('/login', loginAdmin);