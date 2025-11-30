import { Router } from 'express';
import { getAllContactMessages, getAllFeedback, submitContact, submitFeedback } from '../controllers/supportControllers';

export const SupportRouter = Router();

SupportRouter.post('/feedback', submitFeedback);
SupportRouter.post('/contact', submitContact);
SupportRouter.get("/feedback" , getAllFeedback);
SupportRouter.get("/contact" , getAllContactMessages);