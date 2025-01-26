import List from "../models/list.js";

export async function NewHabit({ Title, id, checked = false }) {
    if (!Title || !id) return { error: 'Todos os campos são obrigatórios.' };

    try {
        const ExistingList = await List.findOne({ id: id });

        if (ExistingList) {
            // Se a lista já existir, adicionar o novo hábito
            const newHabit = {
                Title,
                FinishedDays: [
                    , // Corrigi o nome do campo "Data" para "data"
                ],
            };

            // Adiciona o novo hábito à lista
            ExistingList.Habits.push(newHabit);

            // Salva a lista com o novo hábito
            await ExistingList.save();
            console.log('Habit adicionado à lista existente.');

            return ExistingList;
        }

        // Se a lista não existir, cria uma nova
        const newList = new List({
            id,
            task: [],
            Habits: [
                {
                    Title,
                    checked,
                    FinishedDays: [
                        { checked, data: new Date() }, // Correção aqui também
                    ],
                },
            ],
        });

        // Salva a nova lista
        await newList.save();
        console.log('Nova lista criada com o hábito.');

        return newList;

    } catch (error) {
        console.error('Error creating new habit:', error);
        return { error: 'Erro ao processar a solicitação.' };
    }
}
