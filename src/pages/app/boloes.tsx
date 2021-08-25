import React from 'react';
import { Text, Row, Col, Button, Div } from 'atomize'
import { GbsButton, GbsMenu } from '../../components';
import { renderDeclarativeRules } from 'styletron-standard';
import { BolaoDrawer } from '../../components/bolao';

class BoloesPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        };
    }



    render() {
        const { showSideDrawer } = this.state;
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
                            <GbsButton text="Novo bolão" icon="Plus" click={() => this.setState({ showSideDrawer: true })} />
                        </Col>

                    </Row>
                </Div>

                <BolaoDrawer isOpen={showSideDrawer} onClose={() => this.setState({ showSideDrawer: false })} />
            </>
        );
    }
}

export default BoloesPage