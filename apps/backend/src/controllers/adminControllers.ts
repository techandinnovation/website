import { Request, Response } from "express";
import prisma from "../db/prisma";

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { adminName, password } = req.body;

        if (!adminName || !password) {
            res.status(400).json({ error: "Admin name and password are required." });
            return;
        }

        // 1. Find the admin
        const admin = await prisma.admin.findUnique({
            where: { adminName },
        });

        if (!admin) {
            res.status(404).json({ error: "Admin not found." });
            return;
        }


        if (admin.password !== password) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }

        // 3. Send success
        // We don't need to send a token since state is handled on the client
        res.status(200).json({ message: "Login successful" });
        return;

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
};