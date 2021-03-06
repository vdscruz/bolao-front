import React from "react";
import { Div, Input, SideDrawer, Row, Col, Text, Anchor, Dropdown } from "atomize";
import { GbsButton, GbsLabel } from "../..";
import { TipoPontuacao } from "../../../enums/tipo-pontuacao";
import { TipoPremiacao } from "../../../enums/tipo-premiacao";
import { useForm } from "react-hook-form";
import { GbsForm } from "../../gbs-form";
import { Bolao } from './../../../model/bolao';
import { StatusBolao } from "../../../enums/status-bolao";
import axios from "axios";

function menuList(lista: any[], onClick: any) {
    return (
        <Div>
            {lista.map((obj, index) => (
                <GbsButton key={index} type="text" text={obj.key} click={() => onClick(obj)} />
            ))}
        </Div>
    )
};

const MessageError = ({ error }) => {
    if (error) {
        return (<Text tag="span" textColor="danger800" textSize="tiny" m={{ l: '0.5rem' }}>{error.message}</Text>);
    }

    return (<></>);
}

type BolaoDrawerType = {
    isOpen: boolean;
    onClose: any;
}

class BolaoDrawer extends React.Component<BolaoDrawerType> {

    listaPontuacao: any[];
    listaPremiacao: any[];

    constructor(props: BolaoDrawerType) {
        super(props);

        this.state = {
            showDropdownPontuacao: false,
            showDropdownPremiacao: false,
            selectedPontuacao: undefined,
            selectedPremiacao: undefined,
            buttonClicked: false,
            clientId: ''
        }

        this.listaPontuacao = [{ key: 'Placar', value: TipoPontuacao.Placar }, { key: 'Vencedor', value: TipoPontuacao.Vencedor }];
        this.listaPremiacao = [{ key: 'Fixo', value: TipoPremiacao.Fixo }, { key: 'Percentual', value: TipoPremiacao.Percentual }];
    }

    onSubmit = (values: Bolao) => {
        const { selectedPontuacao, selectedPremiacao, clientId } = this.state;

        if (selectedPontuacao == undefined || selectedPremiacao == undefined)
            return;

        values.tipoPontuacao = selectedPremiacao.value
        values.tipoPremiacao = selectedPontuacao.value
        values.criador = clientId

        // TODO: Chamar api
        axios.post('/api/bolao', values)
            .then(response => this.props.onClose());
    };

    render() {

        const {
            showDropdownPontuacao,
            showDropdownPremiacao,
            selectedPontuacao,
            selectedPremiacao,
            buttonClicked,
            clientId
        } = this.state;



        return (
            <SideDrawer isOpen={this.props.isOpen} onClose={this.props.onClose} w={{ xs: "100vw", md: "40rem" }}>
                <GbsForm>
                    {({ handleSubmit, register, formState: { errors } }, { tokenParsed }) => {
                        return (
                            <form onSubmit={handleSubmit(this.onSubmit)}>

                                <Div d="flex">
                                    <Text tag="header" textSize="heading" textColor="onSurface">Cadastro de Bol??o</Text>
                                </Div>
                                <Div m={{ b: "2rem", t: "1.5rem" }}>

                                    <Row m={{ b: "0.5rem" }}>
                                        <Col>
                                            <GbsLabel text="Nome do bol??o" />
                                            <Input placeholder="Digite aqui o nome do bol??o"
                                                {...register("nome", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.nome} />
                                        </Col>
                                    </Row>

                                    <Row m={{ b: "0.5rem" }}>
                                        <Col size={{ xs: '12', md: '6' }}>
                                            <GbsLabel text="Tipo Pontua????o" />
                                            <Dropdown isOpen={showDropdownPontuacao}
                                                onClick={() => this.setState({ showDropdownPontuacao: !showDropdownPontuacao })}
                                                menu={menuList(this.listaPontuacao, (selected) => this.setState({ selectedPontuacao: selected, showDropdownPontuacao: !showDropdownPontuacao }))}
                                                {...register("tipoPontuacao")}>
                                                {selectedPontuacao == undefined ? '...' : selectedPontuacao.key}
                                            </Dropdown>
                                            <MessageError error={buttonClicked && selectedPontuacao == undefined ? { message: 'Campo Obrigat??rio' } : undefined} />
                                        </Col>
                                        <Col size={{ xs: '12', md: '6' }}>
                                            <GbsLabel text="Tipo Premia????o" />
                                            <Dropdown isOpen={showDropdownPremiacao}
                                                onClick={() => this.setState({ showDropdownPremiacao: !showDropdownPremiacao })}
                                                menu={menuList(this.listaPremiacao, (selected) => this.setState({ selectedPremiacao: selected, showDropdownPremiacao: !showDropdownPremiacao }))}
                                                {...register("tipoPremiacao")}>
                                                {selectedPremiacao == undefined ? '...' : selectedPremiacao.key}
                                            </Dropdown>
                                            <MessageError error={buttonClicked && selectedPremiacao == undefined ? { message: 'Campo Obrigat??rio' } : undefined} />
                                        </Col>
                                    </Row>

                                    <Row m={{ b: "0.5rem" }}>
                                        <Col size={{ xs: '12', md: '4' }}>
                                            <GbsLabel text="1?? Lugar" />
                                            <Input placeholder="Premia????o 1?? Lugar" type="number"
                                                {...register("premio_1", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.premio_1} />
                                        </Col>
                                        <Col size={{ xs: '12', md: '4' }}>
                                            <GbsLabel text="2?? Lugar" />
                                            <Input placeholder="Premia????o 2?? Lugar" type="number"
                                                {...register("premio_2", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.premio_2} />
                                        </Col>
                                        <Col size={{ xs: '12', md: '4' }}>
                                            <GbsLabel text="3?? Lugar" />
                                            <Input placeholder="Premia????o 3?? Lugar" type="number"
                                                {...register("premio_3", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.premio_3} />
                                        </Col>
                                    </Row>

                                    <Row m={{ b: "0.5rem" }}>
                                        <Col size={{ xs: '12', md: '6' }}>
                                            <GbsLabel text="B??nus" />
                                            <Input placeholder="Valor de b??nus se acertar todo o bol??o" type="number"
                                                {...register("premio_bonus", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.premio_bonus} />
                                        </Col>
                                        <Col size={{ xs: '12', md: '6' }}>
                                            <GbsLabel text="Valor da Aposta" />
                                            <Input placeholder="Valor para apostar no bol??o" type="number"
                                                {...register("valorAposta", { required: 'Campo Obrigat??rio' })} />
                                            <MessageError error={errors?.valorAposta} />
                                        </Col>
                                    </Row>

                                </Div>
                                <Div d="flex" justify="flex-end" p={{ b: "1rem" }}>
                                    <GbsButton click={this.props.onClose} text="Cancelar" type="outlined" />
                                    <GbsButton click={() => this.setState({ buttonClicked: true, clientId: tokenParsed.sub })} submit text="Salvar" />
                                </Div>

                            </form>
                        )
                    }}
                </GbsForm>
            </SideDrawer >
        );
    }
}


export default BolaoDrawer;