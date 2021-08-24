import { StatusBolao } from "../enums/status-bolao";
import { TipoPontuacao } from "../enums/tipo-pontuacao";
import { TipoPremiacao } from "../enums/tipo-premiacao";

export type Bolao = {
    nome: string;
    criador: string;
    dt_criacao: Date;
    status: StatusBolao;
    tipoPontuacao: TipoPontuacao;
    tipoPremiacao: TipoPremiacao;
    primeiro_lugar: number;
    segundo_lugar?: number;
    terceiro_lugar?: number;
    bonus?: number;
    valor: number;
    jogos: [];
    palpites: []
}
