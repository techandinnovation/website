import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { type, title, description, email } = req.body;

    // Basic Validation
    if (!type || !title || !description) {
      res.status(400).json({ error: "Type, Title, and Description are required." });
      return;
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        type,
        title,
        description,
        email: email || null, // Handle empty string as null
      },
    });

    res.status(201).json({ 
      message: "Feedback submitted successfully!", 
      data: newFeedback 
    });
    return;

  } catch (error) {
    console.error("Feedback Submission Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const newContact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json({ 
      message: "Message sent successfully!", 
      data: newContact 
    });
    return;

  } catch (error) {
    console.error("Contact Submission Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackList = await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc', // Newest first
      },
    });

    res.status(200).json(feedbackList);
    return;

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const getAllContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc', // Newest first
      },
    });

    res.status(200).json(messages);
    return;

  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};