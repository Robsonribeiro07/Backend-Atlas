import mongoose from "mongoose";
import habitSchema from "./habit.js";

const listSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    image_profile: {type: String, required: false},
    task: [{
        tarefa: { type: String, required: true }, 
        prioridade: { 
            type: String, 
            enum: ['Baixa', 'Media', 'Alta'], 
            default: 'Media'

        },
        id: { type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId, unique: true 
         },
        status: { 
            type: String, 
            enum: ['pendente', 'concluido'], 
            default: 'pendente' 
        },
        createAt: { type: Date, default: new Date()} ,
        FinishedAt: {type: Date, default: () => {
            const now = new Date()
            now.setHours(23,59,59,999)
            return now
        }
    }
    }
   ],
   Habits: {
    type: [habitSchema],
    required: false,
   }
});

const List = mongoose.model("List", listSchema);

export default List;
