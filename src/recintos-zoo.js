class RecintosZoo {
    analisaRecintos(tipoAnimal, quantidade) {
        const recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: { macaco: 3 } },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: {} },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: { gazela: 1 } },
            { numero: 4, bioma: "rio", tamanho: 8, animais: {} },
            { numero: 5, bioma: "savana", tamanho: 9, animais: { leao: 1 } },
        ];

        const animais = {
            "leao": { tamanho: 3, biomas: ["savana"], carnivoro: true },
            "leopardo": { tamanho: 2, biomas: ["savana"], carnivoro: true },
            "crocodilo": { tamanho: 3, biomas: ["rio"], carnivoro: true },
            "macaco": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            "gazela": { tamanho: 2, biomas: ["savana"], carnivoro: false },
            "hipopotamo": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };

        const animaisValidos = new Set(Object.keys(animais));
        const tipoAnimalNormalizado = tipoAnimal.toLowerCase();

        if (!animaisValidos.has(tipoAnimalNormalizado)) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || quantidade % 1 !== 0) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = animais[tipoAnimalNormalizado];
        const espacoNecessario = infoAnimal.tamanho * quantidade;
        let recintosViaveis = [];

        for (const recinto of recintos) {
            if (recinto.bioma.split(" ").every(bioma => !infoAnimal.biomas.includes(bioma))) {
                continue;
            }

            let espacoOcupado = 0;
            let outraEspeciePresente = false;
            let especieCompativel = true;

            for (const [especie, quantidade] of Object.entries(recinto.animais)) {
                const especieNormalizada = especie.toLowerCase();
                const infoEspecie = animais[especieNormalizada];
                espacoOcupado += infoEspecie.tamanho * quantidade;

                if (infoAnimal.carnivoro || infoEspecie.carnivoro) {
                    if (especieNormalizada !== tipoAnimalNormalizado) {
                        especieCompativel = false;
                    }
                }

                if (especieNormalizada !== tipoAnimalNormalizado) {
                    outraEspeciePresente = true;
                }
            }

            if (!especieCompativel) {
                continue;
            }

            if (outraEspeciePresente) {
                espacoOcupado += 1;
            }

            if (espacoOcupado + espacoNecessario <= recinto.tamanho) {
                const espacoLivre = recinto.tamanho - (espacoOcupado + espacoNecessario);
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis.sort() };
    }
}

export { RecintosZoo as RecintosZoo }