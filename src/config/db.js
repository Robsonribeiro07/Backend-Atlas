
import mongoose from 'mongoose';

async function connectDb() {

    if (mongoose.connection.readyState === 0) {  // 0 -> desconectado
        try {
            console.log("Tentando conectar ao MongoDB...");
            await mongoose.connect("mongodb+srv://Atlas:N28u6NtXYZa4wl4N@atlasdb.uaqbh.mongodb.net/AtlasDbs?retryWrites=true&w=majority&appName=AtlasDb");
            
            console.log('Conectado ao MongoDB');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
        } 
    } else {
        console.log('Já existe uma conexão ativa ao MongoDB');
    } 
}

export default connectDb;