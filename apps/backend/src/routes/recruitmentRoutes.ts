import { Router } from "express";
import { submitApplication } from "../controllers/recruitmentControllers";

export const RecruitementRouter = Router();

RecruitementRouter.post("/submit" , submitApplication);