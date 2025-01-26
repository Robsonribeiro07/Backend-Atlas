import express from 'express';
import List from '../models/list.js';
import cloudinary from '../config/cloudinary.js';
const profile = express.Router();


profile.post('/update-image', async (req, res) => {
    const { image, UserId } = req.body;


    console.log( UserId);
    if(!image ||!UserId) return res.status(400).send('Todos os campos são obrigatórios')

    try {
        
        const list = await List.findOne({id: UserId})

        if(!list) return res.status(404).send('Nenhuma lista encontrada')

        const result = await cloudinary.uploader.upload(image, {
            folder: "user_images",

            
        })

        if(!result) return res.status(500).send('Falha ao fazer upload da imagem')
            
        list.image_profile = result.secure_url

        console.log('Imagem atualizada:', result.secure_url)
        await list.save()

        return res.status(200).json({message: 'Imagem atualizada com sucesso', image: result.secure_url  })

    } catch (e) {
        console.error('Error updating image:', e)
        return res.status(500).send('Falha ao atualizar a imagem')
    }
})
export default profile;