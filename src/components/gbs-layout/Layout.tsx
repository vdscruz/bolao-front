import { useKeycloak } from "@react-keycloak/ssr"
import { KeycloakInstance } from "keycloak-js"
import { Head } from "next/document"
import React from "react"
import { GbsMenu } from ".."
import { Div, Row, Col } from 'atomize'
import { ParsedToken } from "../../types/parsed-token"

const Layout = ({ children, pageContext }) => {
    const { keycloak } = useKeycloak<KeycloakInstance>()
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

    return (
        <>
            <GbsMenu insider />
            <Row bg="background">
                <Col d='flex' justify='center'>
                    <Div w={{ xs: 'auto', md: '100vw', lg: '80vw' }}>
                        {children}
                    </Div>
                </Col>
            </Row>
        </>
    )
}

export default Layout