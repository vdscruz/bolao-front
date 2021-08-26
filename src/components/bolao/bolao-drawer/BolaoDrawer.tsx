import React from "react";
import { Div, Input, SideDrawer, Row, Col, Text, Anchor, Dropdown } from "atomize";
import { GbsButton, GbsLabel } from "../..";
import { TipoPontuacao } from "../../../enums/tipo-pontuacao";
import { TipoPremiacao } from "../../../enums/tipo-premiacao";

function menuList(lista: any[], onClick: any) {
    return (
        <Div>
            {lista.map((obj, index) => (
                <GbsButton key={index} type="text" text={obj.key} click={() => onClick(obj)} />
            ))}
        </Div>
    )
};

type BolaoDrawerType = {
    isOpen: boolean;
    onClose: any;
    onSave?: any;
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
            selectedPremiacao: undefined
        }

        this.listaPontuacao = [{ key: 'Placar', value: TipoPontuacao.Placar }, { key: 'Vencedor', value: TipoPontuacao.Vencedor }];
        this.listaPremiacao = [{ key: 'Fixo', value: TipoPremiacao.Fixo }, { key: 'Percentual', value: TipoPremiacao.Percentual }];
    }

    render() {

        const {
            showDropdownPontuacao,
            showDropdownPremiacao,
            selectedPontuacao,
            selectedPremiacao
        } = this.state;

        return (
            <SideDrawer isOpen={this.props.isOpen} onClose={this.props.onClose} w={{ xs: "100vw", md: "40rem" }}>
                <Div></Div>
                <Div d="flex">
                    <Text tag="header" textSize="heading" textColor="onSurface">Cadastro de Bolão</Text>
                </Div>
                <Div m={{ b: "2rem", t: "1.5rem" }}>

                    <Row m={{ b: "1rem" }}>
                        <Col>
                            <GbsLabel text="Nome do bolão" />
                            <Input placeholder="Digite aqui o nome do bolão" />
                        </Col>
                    </Row>

                    <Row m={{ b: "1rem" }}>
                        <Col size={{ xs: '12', md: '6' }}>
                            <GbsLabel text="Tipo Pontuação" />
                            <Dropdown isOpen={showDropdownPontuacao}
                                onClick={() => this.setState({ showDropdownPontuacao: !showDropdownPontuacao })}
                                menu={menuList(this.listaPontuacao, (selected) => this.setState({ selectedPontuacao: selected, showDropdownPontuacao: !showDropdownPontuacao }))}>
                                {selectedPontuacao == undefined ? '...' : selectedPontuacao.key}
                            </Dropdown>
                        </Col>
                        <Col size={{ xs: '12', md: '6' }}>
                            <GbsLabel text="Tipo Premiação" />
                            <Dropdown isOpen={showDropdownPremiacao}
                                onClick={() => this.setState({ showDropdownPremiacao: !showDropdownPremiacao })}
                                menu={menuList(this.listaPremiacao, (selected) => this.setState({ selectedPremiacao: selected, showDropdownPremiacao: !showDropdownPremiacao }))} >
                                {selectedPremiacao == undefined ? '...' : selectedPremiacao.key}
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row m={{ b: "1rem" }}>
                        <Col size={{ xs: '12', md: '4' }}>
                            <GbsLabel text="1ª Lugar" />
                            <Input placeholder="Premiação 1ª Lugar" />
                        </Col>
                        <Col size={{ xs: '12', md: '4' }}>
                            <GbsLabel text="2ª Lugar" />
                            <Input placeholder="Premiação 2ª Lugar" />
                        </Col>
                        <Col size={{ xs: '12', md: '4' }}>
                            <GbsLabel text="3ª Lugar" />
                            <Input placeholder="Premiação 3ª Lugar" />
                        </Col>
                    </Row>

                    <Row m={{ b: "1rem" }}>
                        <Col size={{ xs: '12', md: '6' }}>
                            <GbsLabel text="Bônus" />
                            <Input placeholder="Valor de bônus se acertar todo o bolão" />
                        </Col>
                        <Col size={{ xs: '12', md: '6' }}>
                            <GbsLabel text="Valor da Aposta" />
                            <Input placeholder="Valor para apostar no bolão" />
                        </Col>
                    </Row>

                </Div>
                <Div d="flex" justify="flex-end" p={{ b: "1rem" }}>
                    <GbsButton click={this.props.onClose} text="Cancelar" type="outlined" />
                    <GbsButton click={this.props.onClose} text="Salvar" />
                </Div>
            </SideDrawer >
        );
    }
}


export default BolaoDrawer;