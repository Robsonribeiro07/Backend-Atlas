import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
   
    Title: { type: String, required: true },
    FinishedDays: [{
        checked: { type: Boolean, required: true, default: false },
        data: { type: Date, required: true },
        _id: { type: String, required: true, unique: true },
    }],
    _id: { type: String, required: true, unique: true },
    
});

export default HabitSchema;
