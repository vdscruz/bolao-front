import { Row, Col, Div, Button, Text } from 'atomize';
import { GbsButton } from '..';

export default function SectionHeader() {
    return (
        <Div
            bg="background"
            textColor="black900"
            minH="80vh"
            w="100vw"
            d="flex"
            flexDir="column"
            justify="center"
            align="center"
            p={{ x: "1rem", y: "4rem" }}
        >
            <Row>
                <Text tag="h1" textSize={{ lg: "display3", xs: "display1" }} textWeight="500" m={{ b: "1rem" }} textAlign="center" >
                    Crie o seu Bolão, de Graça!
                </Text>
            </Row>
            <Row w={{ xs: "90vw", lg: "35vw" }}>
                <Text tag="span" textSize={{ lg: "Typography", xs: "subheader" }} textWeight="300" textAlign="center" m={{ b: "1.5rem" }}>
                    Atomize React is a UI framework that helps developers collaborate with designers and build consistent user interfaces effortlessly.
                </Text>
            </Row>
            <Row>
                <GbsButton text="Iniciar Agora" />
                <GbsButton text="Demonstração" type="outlined" />
            </Row>
        </Div>
    );
}