import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { recruitmentSchema } from '../utils/zodSchema';

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const validationResult = recruitmentSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation Failed",
                details: validationResult.error.format()
            });
        }
        
        const data = validationResult.data;

        const existingUser = await prisma.recruitmentApplication.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            res.status(409).json({ error: "Application with this email already exists." });
            return;
        }

        const application = await prisma.recruitmentApplication.create({
            data: {
                ...data,
                experience: data.experience || null,
                portfolioLink: data.portfolioLink || null,
                resumeUrl: data.resumeUrl || null,
            },
        });

        res.status(201).json({
            message: "Application submitted successfully!",
            id: application.id
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
        return;
    }
};