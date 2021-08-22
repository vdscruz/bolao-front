import { Row, Col, Div, Button, Text } from 'atomize';

export default function SectionHeader() {
    return (
        <Div
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
                <Text tag="h1" textSize={{ lg: "display3", xs: "display1" }} textWeight="500" m={{ b: "1rem" }} textAlign="center">
                    Crie o seu Bolão, de Graça!
                </Text>
            </Row>
            <Row w={{ xs: "90vw", lg: "35vw" }}>
                <Text tag="span" textSize={{ lg: "Typography", xs: "subheader" }} textWeight="300" textAlign="center" m={{ b: "1.5rem" }}>
                    Atomize React is a UI framework that helps developers collaborate with designers and build consistent user interfaces effortlessly.
                </Text>
            </Row>
            <Row>
                <Button
                    h="3rem"
                    p={{ x: "1.25rem" }}
                    textSize="body"
                    textColor="white"
                    hoverTextColor="white"
                    bg="info700"
                    hoverBg="info900"
                    m={{ r: "0.5rem" }}
                >
                    Iniciar agora
                </Button>
                <Button
                    h="3rem"
                    p={{ x: "1.25rem" }}
                    textSize="body"
                    textColor="gray900"
                    hoverTextColor="black"
                    bg="white"
                    hoverBg="white"
                    border="0.5px solid"
                    borderColor="gray900"
                    hoverBorderColor="black"
                    m={{ r: "0.5rem" }}
                >
                    Veja uma demonstração
                </Button>
            </Row>
        </Div>
    );
}