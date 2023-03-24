import mongoose, { Schema } from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)