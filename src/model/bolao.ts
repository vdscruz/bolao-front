import { StatusBolao } from "../enums/status-bolao"
import { TipoPontuacao } from "../enums/tipo-pontuacao"
import { TipoPremiacao } from "../enums/tipo-premiacao"

export class Bolao {
    nome: string
    criador: string
    dtCriacao: Date
    status: StatusBolao
    tipoPontuacao: TipoPontuacao
    tipoPremiacao: TipoPremiacao
    premio_1: number
    premio_2: number
    premio_3: number
    premio_bonus: number
    valorAposta: number
}