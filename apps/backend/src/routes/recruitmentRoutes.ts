import { Router } from "express";
import { getAllApplications, submitApplication } from "../controllers/recruitmentControllers";

export const RecruitementRouter = Router();

RecruitementRouter.post("/submit" , submitApplication);
RecruitementRouter.get("/data" , getAllApplications);