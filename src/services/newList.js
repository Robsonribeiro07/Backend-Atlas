import list from "../models/list.js";

export const createList = async ({ tarefa, prioridade, id }) => {
    if (!tarefa || !prioridade || !id) return { error: 'Parâmetros obrigatórios ausentes.' };

    try {
        const existingList = await list.findOne({ id });

        if (existingList) {
            existingList.task.push({
                tarefa,
                prioridade,
                status: 'pendente'
            });

            await existingList.save();

            console.log('Tarefa adicionada à lista existente.');
            return existingList;
        }

        const newList = new list({
            id,
            task: [{
                tarefa,
                prioridade, 
                status: 'pendente'
            }]
        });

        await newList.save();

        console.log('Lista criada com sucesso.');
        return newList;
    } catch (error) {
        console.error('Erro ao criar ou atualizar a lista:', error);
        return { error: 'Erro ao processar a solicitação.' };
    }
};
