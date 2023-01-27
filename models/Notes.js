import mongoose from 'mongoose';
const { Schema } = mongoose;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "Genearl"
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports= mongoose.model('notes', notesSchema)