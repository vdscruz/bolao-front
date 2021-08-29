import React from 'react';
import { Text, Row, Col, Icon, Div } from 'atomize'
import { GbsButton, GbsMenu } from '../../components';
import { renderDeclarativeRules } from 'styletron-standard';
import { BolaoDrawer } from '../../components/bolao';
import useSWR from 'swr';
import api from '../../utils/api';
import { Bolao } from './../../model/bolao';


const GetSWR = ({ url, children }) => {
    const state = useSWR(url, api);

    return children(state);
}

const BolaoItem = ({ item }) => {
    return (
        <h1>{item.nome}</h1>
    )
}

const BolaoLista = ({ isLoading, data, error }) => {

    if (isLoading) {
        return (<Icon name="Loading" size="20px" />)
    }

    if (data != undefined && data.status == 200) {
        const array: Bolao[] = data.data;
        return (
            <Div>{array.map((obj, index) => (<BolaoItem key={index} item={obj} />))}</Div>
        )
    }

    return (<h1>Sem dados...</h1>);
}



class BoloesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        };
    }

    close(mutate) {
        this.setState({ showSideDrawer: false })
        mutate()
    }

    render() {

        const { showSideDrawer } = this.state;
        const getUri = '/api/bolao';

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
                <Div p="1rem">
                    <GetSWR url={getUri}>
                        {({ isLoading, data, error, mutate }) => {
                            return (
                                <>
                                    <BolaoDrawer isOpen={showSideDrawer} onClose={() => this.close(mutate)} />
                                    <BolaoLista isLoading={isLoading} data={data} error={error} />
                                </>
                            )
                        }}
                    </GetSWR>
                </Div>


            </>
        );
    }
}

export default BoloesPage