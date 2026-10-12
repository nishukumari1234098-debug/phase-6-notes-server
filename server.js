import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import notesServerDB from "./config/db.js"
import Note from "./models/noteModel.js"

dotenv.config()
// Database connection is awaited before starting the server.

const app = express()

app.use(express.json())
app.use(express.static("public"));
app.use(cors())

app.post("/notes", async (req, res)=>{
    try{
        const {title, content} = req.body

        const quickNotes = await Note.create({
            title,
            content
        })

        res.status(201).json({
            success: true,
            data: quickNotes
        })
    } catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

app.get("/notes", async (req, res)=>{
    try{
        const serveNotes = await Note.find()

        res.status(200).json({
            success: true,
            count: serveNotes.length,
            data: serveNotes
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

const PORT = process.env.PORT || 5000

async function startServer() {
    try {
        await notesServerDB();
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`notes-server server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
