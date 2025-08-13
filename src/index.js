import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import { app, server } from "./lib/socket.js";
dotenv.config();

const port = process.env.PORT;

app.use(
  cors({
    origin: ["https://talksy-sarfaraz-akram.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));

app.get('/', (req, res)=>{
  res.send('talksy running')
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
  connectDB();
});
