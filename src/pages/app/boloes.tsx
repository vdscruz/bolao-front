import React from 'react';
import { Text, Row, Col, Button, Div } from 'atomize'
import { GbsMenu } from '../../components';

const BoloesPage = () => {
    return (
        <>
            <Div p="1rem">
                <Row>
                    <Col>
                        <Text tag="header" textSize="display1">
                            Meus Bolões
                        </Text>
                    </Col>
                    <Col d="flex" justify="flex-end">
                        <Button
                            h="2.5rem"
                            p={{ x: "1rem" }}
                            textSize="body"
                            textColor="info700"
                            hoverTextColor="info900"
                            bg="gray200"
                            hoverBg="info200"
                            m={{ r: "0.5rem" }}
                        >
                            Novo Bolão
                        </Button>
                    </Col>

                </Row>
            </Div>


        </>
    );
}

export default BoloesPage