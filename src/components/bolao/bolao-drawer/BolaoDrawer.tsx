import React from "react";
import { Div, Input, SideDrawer, Row, Col, Text } from "atomize";
import { GbsButton, GbsLabel } from "../..";

const BolaoDrawer = ({ isOpen, onClose }) => {
    return (
        <SideDrawer isOpen={isOpen} onClose={onClose} w={{ xs: "100vw", md: "40rem" }}>
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
                    <Col>
                        <GbsLabel text="1ª Lugar" />
                        <Input placeholder="Premiação 1ª Lugar" />
                    </Col>
                    <Col>
                        <GbsLabel text="2ª Lugar" />
                        <Input placeholder="Premiação 2ª Lugar" />
                    </Col>
                    <Col>
                        <GbsLabel text="3ª Lugar" />
                        <Input placeholder="Premiação 3ª Lugar" />
                    </Col>
                </Row>

            </Div>
            <Div d="flex" justify="flex-end">
                <GbsButton click={onClose} text="Cancelar" type="outlined" />
                <GbsButton click={onClose} text="Salvar" />
            </Div>
        </SideDrawer>
    );
};

export default BolaoDrawer;