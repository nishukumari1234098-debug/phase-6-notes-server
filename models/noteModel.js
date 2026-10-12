import mongoose from "mongoose";

const noteServerSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        content:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model("Note", noteServerSchema)

export default Note