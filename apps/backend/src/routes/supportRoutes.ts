import { Router } from 'express';
import { submitContact, submitFeedback } from '../controllers/supportControllers';

export const SupportRouter = Router();

SupportRouter.post('/feedback', submitFeedback);
SupportRouter.post('/contact', submitContact);