    import express, { Router } from 'express';
    import { createList } from '../services/newList.js';
    import List from '../models/list.js';

    const router = express.Router()

    router.post('/new-task', async (req, res) => {

    const {tarefa, prioridade, id, } = req.body


        if(!tarefa || !prioridade) return res.send('Todos os campos são obrigatórios')

        try {
            const newList = await createList({
                id,
                tarefa,
                prioridade
            })
        
        
            await newList.save()
        
            res.status(200).json({ message: 'lista criada com sucesso' })
        
            
        } catch {
           return res.status(500).send('Error creating new list')
        }
        
    })

    router.post('/get-lists', async (req, res) => {

        const {userId} = req.body
    


        if(!userId) return res.status(400).send('Id do usuário é obrigatório')
        
        try {
        const lists = await List.findOne({id: userId})

            if(!lists) return res.status(404).send('Nenhuma lista encontrada')

            const sortedDays = lists.task.sort((a,b) => {
                return new Date(a.createAt) - new Date(b.createAt)
            })

            lists.task = sortedDays
            return res.status(200).json(lists)

        } catch (e) {
            return res.status(500).send('Falha ao buscar as listas')
        }
    })

    router.patch('/finished-task', async (req, res) => {

        const {taskId, UserId} = req.body

        if(!taskId ||!UserId) return res.status(400).send('Todos os campos são obrigatórios')

        try {
            const list = await List.findOne({id: UserId})


            if(!list) return res.status(404).send('Nenhuma lista encontrada')

            list.task = list.task.map(task => {
                if(task._id.toString() === taskId) {
                    if(task.status === 'pendente') {
                        task.status = 'concluido'
                    } else {
                        task.status = 'pendente'
                    }
                }
                return task
            })

            console.log(list.task)
        
            
            await list.save()
            console.log('Tarefa marcada como concluída:', list)

            return res.status(200).json(list)  
        } catch {
            return res.status(500).send('Falha ao marcar tarefa como concluída')
        }
    })
    router.delete('/remove-task', async (req, res) => {
        const {taskId, UserId} = req.body
        
        if(!taskId ||!UserId) return res.status(400).send('Todos os campos são obrigatórios')

        try {
            const list = await List.findOne({id: UserId})

            if(!list) return res.status(404).send('Nenhuma lista encontrada')

            list.task = list.task.filter(task => task._id.toString() !== taskId)

            await list.save()
        } catch {
            return res.status(500).send('Falha ao remover tarefa')
        }
    })
    router.delete('/removeAll-task', async (req, res) => {
        const {UserId} = req.body

        if(!UserId) return res.status(400).send('Id do usuário é obrigatório')

        try {
            const DeleteAll = await List.findOne({id: UserId})

            if(!DeleteAll) return res.status(404).send('Nenhuma lista encontrada')

            DeleteAll.task = []

            await DeleteAll.save()

            console.log('Todas as tarefas foram removidas:', DeleteAll)

            return res.status(200).json({ message: 'Todas as tarefas foram removidas' })


        } catch {
            return res.status(500).send('Falha ao remover todas as tarefas')
        }
    })

   router.patch('/edit-task', async (req, res) => {

     const {UserId, TaskId, UpdateName} = req.body

     if(!TaskId || !UserId || !UpdateName) return res.status(400).send('Todos os campos são obrigatórios')

    try {
        const list = await List.findOne({id: UserId})

        if(!list) return res.status(404).send('Nenhuma lista encontrada')

        list.task = list.task.map(task => {
            if(task._id.toString() === TaskId) {
                task.tarefa = UpdateName
              
            }
            return task
        })

        await list.save()
        console.log('Tarefa editada:', list)
        return res.status(200).json({message: 'Tarefa editada com sucesso' })
    } catch {
        return res.status(500).send('Falha ao editar tarefa')
    }


   })
    export default router;