import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { RecruitementRouter } from "./routes/recruitmentRoutes";

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://techandinnovation.org',
        'https://www.techandinnovation.org',
        'https://techandinnovation.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/recruitment" , RecruitementRouter);

app.get("/" , (req, res) => {
    res.send(`
        <h1 style="text-align: center;">TechAndInnovation's Server is up and running!!</h1>

        <div style="text-align: center; margin-top: 20px;">
            <a href="https://techandinnovation.org"> Contiue to website!! </a>
        </div>
    `)
})

app.listen(PORT, () => {
    console.log(`Backend: http://localhost:${PORT}`);
})