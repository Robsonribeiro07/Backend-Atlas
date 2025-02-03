import express from 'express';
import { NewHabit } from '../services/newHabit.js';
import List from '../models/list.js';

const habit = express.Router()


habit.post('/new-habit', async (req, res) => {
    const {UserId, Title, habitId,} = req.body

    console.log(habitId)
    if(!UserId || !Title) return res.send('Todos os campos são obrigatórios')
     
    
    try {

    await NewHabit({id: UserId, Title: Title, habitId: habitId})

    return res.status(200).send('Novo hábito cadastrado com sucesso')

         
    } catch (e) {
        return res.status(500).send('Falha ao cadastrar novo hábito')
    }
})
habit.post('/get-habits', async (req, res) => {
    const {userId} = req.body
    if(!userId) return res.status(400).send('Id do usuário é obrigatório')
    
    try {
        const list = await List.findOne({id: userId  })

        if(!list) return res.status(404).send('Nenhuma lista encontrada')
          
            console.log('lista enviads')
        return res.json(list.Habits)
    } catch  {
        return res.status(500).send('Falha ao buscar os hábitos')
    }

})
habit.patch('/finished-habit', async (req, res) => {
    const { UserId, HabitId, FinishedDays, _id } = req.body;
    console.log(`id aqui ${HabitId  }`)




    if (!UserId || !HabitId || !FinishedDays) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    try {
        const list = await List.findOne({ id: UserId });

        if (!list) {
            return res.status(404).send('Nenhuma lista encontrada');
        }

        const habit = list.Habits.find(h => h._id.toString() === HabitId);

        if (!habit) {
            return res.status(404).send('Hábito não encontrado');
        }

        const existingDay = habit.FinishedDays.find(day => new Date(day.data).setHours(0, 0, 0, 0) === new Date(FinishedDays).setHours(0, 0, 0, 0));

        if (existingDay) {
            existingDay.checked = !existingDay.checked; // Alterna entre true/false
            console.log('marcado como concluído')
        } else {
            habit.FinishedDays.push({
                data: FinishedDays,
                checked: true,  
                _id: _id
            });
            console.log('marcado como false')
            
        }

        await list.save();

        return res.status(200).json({ message: 'Hábito marcado como concluído' });

    } catch (error) {
        return res.status(500).send('Erro ao processar a solicitação');
    }
});

habit.delete('/delete-habit',  async (req,res) => { 
    const {UserId, habitId} = req.body

    if(!UserId || !habitId) return res.status(400).send('Todos os campos são obrigatórios')
    
    try {
        const list = await List.findOne({id: UserId})

        if(!list) return res.status(404).send('Nenhuma lista encontrada')

        const updateHabitWithoutDeleteHabit = list.Habits.filter((habit) => habit.id !== habitId)

        list.Habits = updateHabitWithoutDeleteHabit

        await list.save()


        return res.status(200).send('Hábito excluído com sucesso')

        
   
    } catch {
        return res.status(500).send('Falha ao excluir o hábito')
        
    }
})
export default habit;