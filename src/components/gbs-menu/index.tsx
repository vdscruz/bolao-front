import { Row, Col, Div, Button, Image } from 'atomize';
import Link from 'next/link'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance, KeycloakLogoutOptions } from 'keycloak-js'
import { ParsedToken } from '../../types/parsed-token';
import { GbsButton } from '..';


interface MenuProps {
    insider?: boolean
}

function loginUrl(keycloak: KeycloakInstance) {
    if (keycloak) {
        const redirectUri = 'http://localhost:3000/app/boloes/'
        window.location.href = keycloak.createLoginUrl({ redirectUri })
    }
}

function cadastroUrl(keycloak: KeycloakInstance) {
    if (keycloak) {
        window.location.href = keycloak.createAccountUrl()
    }
}

function logoutUrl(keycloak: KeycloakInstance) {
    if (keycloak) {
        const redirectUri = 'http://localhost:3000';
        window.location.href = keycloak.createLogoutUrl({ redirectUri });
    }
}

const MenuNotLogged = (keycloak: KeycloakInstance) => {
    return (<>
        <GbsButton type="text" text="Entrar" click={() => loginUrl(keycloak)} />
        <GbsButton type="contained" text="Cadastro" click={() => cadastroUrl(keycloak)} />
    </>);
}

const MenuLogged = (keycloak: KeycloakInstance) => {
    return (<>
        <GbsButton type="text" text="Sair" click={() => logoutUrl(keycloak)} />
        <Link href="/app/perfil/">
            <a>
                <GbsButton type="contained" text="Administração" />
            </a>
        </Link>
    </>);
}

const MenuInsider = (keycloak: KeycloakInstance) => {
    return (<>
        <Link href="/app/boloes/">
            <a><GbsButton type="text" text="Meus Bolões" /></a>
        </Link>
        <Link href="/app/perfil/">
            <a><GbsButton type="text" text="Perfil" /></a>
        </Link>
        <GbsButton type="text" text="Sair" click={() => logoutUrl(keycloak)} />
    </>);
}

export default function MainMenu(props?: MenuProps) {

    const { keycloak } = useKeycloak<KeycloakInstance>()
    const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

    let buttom = keycloak?.authenticated ? (
        MenuLogged(keycloak)
    ) : (
        MenuNotLogged(keycloak)
    );

    if (keycloak?.authenticated && props.insider) {
        buttom = MenuInsider(keycloak);
    }




    return (
        <>
            <Div bg="background" w="100vw" d='flex' justify="center"
                p={{ y: ".5rem" }}>
                <Row w={{ xs: "100vw", lg: "80vw" }}>
                    <Col size={{ xs: 6, lg: 4 }}>
                        <Div p=".7rem">
                            <Image w="7rem" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDciIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxMDcgMTkiPgogIDxwYXRoIGQ9Ik0xNTcuOCwzMC4xODQ2MTU0IEwxNzAuODE1Mzg1LDQzLjIgTDE3MC44MTUzODUsMzkuOTIyMDk4OCBDMTcwLjgxNTM4NSwzNi41MzYxNjA0IDE3MC41NTg5MjIsMzUuMjA4MDg4NiAxNjkuODI2MDI0LDMzLjgzNzY4NzcgQzE2OS4yMDk0MDEsMzIuNjg0NzA0MyAxNjguMzE1Mjk2LDMxLjc5MDU5ODYgMTY3LjE2MjMxMiwzMS4xNzM5NzYzIEMxNjUuNzkxOTExLDMwLjQ0MTA3NzkgMTY0LjQ2Mzg0LDMwLjE4NDYxNTQgMTYxLjA3NzkwMSwzMC4xODQ2MTU0IEwxNTcuOCwzMC4xODQ2MTU0IFogTTE2Ny43NjkyMzEsNDUgTDE1Niw0NSBMMTU2LDI4LjM4NDYxNTQgTDE2MS4wNzc5MDEsMjguMzg0NjE1NCBDMTY1LjA4OTczNiwyOC4zODQ2MTU0IDE2Ni41NDQ1MjQsMjguODAyMzMwNiAxNjguMDExMTksMjkuNTg2NzEyNiBDMTY5LjQ3Nzg1NywzMC4zNzEwOTQ1IDE3MC42Mjg5MDYsMzEuNTIyMTQzMSAxNzEuNDEzMjg3LDMyLjk4ODgwOTcgQzE3Mi4xOTc2NjksMzQuNDU1NDc2NCAxNzIuNjE1Mzg1LDM1LjkxMDI2NDQgMTcyLjYxNTM4NSwzOS45MjIwOTg4IEwxNzIuNjE1Mzg1LDQ1IEwxNjcuNzY5MjMxLDQ1IFogTTE3Mi4yNjkyMzEsMzAuNDYxNTM4NSBDMTcxLjMxMzM1MywzMC40NjE1Mzg1IDE3MC41Mzg0NjIsMjkuNjg2NjQ2NyAxNzAuNTM4NDYyLDI4LjczMDc2OTIgQzE3MC41Mzg0NjIsMjcuNzc0ODkxOCAxNzEuMzEzMzUzLDI3IDE3Mi4yNjkyMzEsMjcgQzE3My4yMjUxMDgsMjcgMTc0LDI3Ljc3NDg5MTggMTc0LDI4LjczMDc2OTIgQzE3NCwyOS42ODY2NDY3IDE3My4yMjUxMDgsMzAuNDYxNTM4NSAxNzIuMjY5MjMxLDMwLjQ2MTUzODUgWiBNMTgwLjQ2MTAxLDQzLjI0NDA3ODcgQzE3OS4yOTA3MjEsNDIuMDY4MDY1OSAxNzguNjQ0MTY2LDQwLjQ3MTMwNzMgMTc4LjY2NzE5MiwzOC44MTQgQzE3OC42NDQxNjYsMzcuMTU2NjkyNyAxNzkuMjkwNzIxLDM1LjU1OTkzNDEgMTgwLjQ2MTAxLDM0LjM4MzkyMTMgQzE4MS42MzEyOTgsMzMuMjA3OTA4NiAxODMuMjI2NzM5LDMyLjU1MTcwMzcgMTg0Ljg4NzQzMiwzMi41NjMzMzMzIEMxODYuMjI1MTc0LDMyLjU1MjU1MzYgMTg3LjUyNzY2MywzMi45OTExODUgMTg4LjU4NTM3NSwzMy44MDg2NjY3IEwxODguNTg1Mzc1LDMyLjc5MjY2NjcgTDE5MS4yNTczLDMyLjI1OTMzMzMgTDE5MS4yNTczLDQ0LjggTDE4OC41ODUzNzUsNDQuOCBMMTg4LjU4NTM3NSw0My44MTY2NjY3IEMxODcuNTI4MDEyLDQ0LjYzNTEwMjYgMTg2LjIyNTQ5LDQ1LjA3NDY4NDIgMTg0Ljg4NzQzMiw0NS4wNjQ2NjY3IEMxODMuMjI2NzM5LDQ1LjA3NjI5NjQgMTgxLjYzMTI5OCw0NC40MjAwOTE0IDE4MC40NjEwMSw0My4yNDQwNzg3IFogTTE4NC45NzI5MzQsMzUuMTY1OTI0OSBDMTgyLjk1NDIyNywzNS4xNjU5MjQ5IDE4MS4zMTc3NDEsMzYuNzk5MjY1MiAxODEuMzE3NzQxLDM4LjgxNCBDMTgxLjMxNzc0MSw0MC44Mjg3MzQ4IDE4Mi45NTQyMjcsNDIuNDYyMDc1MiAxODQuOTcyOTM0LDQyLjQ2MjA3NTIgQzE4NS45Mzk4MSw0Mi40NjY0MzA2IDE4Ni44Njc3NDgsNDIuMDgyMTIyIDE4Ny41NDc0MDcsNDEuMzk1NzczMSBDMTg4LjIyNzA2Niw0MC43MDk0MjQzIDE4OC42MDExODksMzkuNzc4ODU1MiAxODguNTg1Mzc1LDM4LjgxNCBDMTg4LjYwMTE4OSwzNy44NDkxNDQ4IDE4OC4yMjcwNjYsMzYuOTE4NTc1NyAxODcuNTQ3NDA3LDM2LjIzMjIyNjkgQzE4Ni44Njc3NDgsMzUuNTQ1ODc4MSAxODUuOTM5ODEsMzUuMTYxNTY5NCAxODQuOTcyOTM0LDM1LjE2NTkyNDkgWiBNMTk4Ljk4OTg0OSw0NC45NSBDMTk3Ljg3NTY1Niw0NC45NSAxOTcuMDUwMDMyLDQ0LjY4MzMzMzMgMTk2LjQzODE2MSw0NC4xNzEzMzMzIEMxOTUuNzM4MTE3LDQzLjU2ODY2NjcgMTk1LjM2OTM5MSw0Mi42MzggMTk1LjM2OTM5MSw0MS40MDMzMzMzIEwxOTUuMzY5MzkxLDM1LjQxNjY2NjcgTDE5My4wNzk1NTIsMzUuNDE2NjY2NyBMMTkzLjA3OTU1MiwzMi43OTI2NjY3IEwxOTUuMzgyNzUxLDMyLjc5MjY2NjcgTDE5NS4zODI3NTEsMzAuMzkyNjY2NyBMMTk4LjA1NDY3NSwyOS42MDg2NjY3IEwxOTguMDU0Njc1LDMyLjgwODY2NjcgTDIwMS4xNzAxMzksMzIuODA4NjY2NyBMMjAxLjE3MDEzOSwzNS40MTY2NjY3IEwxOTguMDUyMDAzLDM1LjQxNjY2NjcgTDE5OC4wNTIwMDMsNDEuNDE2NjY2NyBDMTk4LjA1MjAwMyw0MS44MyAxOTguMTEzNDU3LDQyLjEyNiAxOTguMjIzMDA2LDQyLjIxNjY2NjcgQzE5OC40OTAxOTksNDIuNDU5MzMzMyAxOTkuNjIwNDIzLDQyLjM2MDY2NjcgMjAwLjI5NjQyLDQyLjI5OTMzMzMgTDIwMS4xNzAxMzksNDIuMjE2NjY2NyBMMjAxLjE3MDEzOSw0NC43MTUzMzMzIEwyMDAuNDg4Nzk4LDQ0LjgxOTMzMzMgQzE5OS45OTMyNDcsNDQuOTAxMjAyMyAxOTkuNDkyMTE3LDQ0Ljk0NDg4NjggMTk4Ljk4OTg0OSw0NC45NSBaIE0yMDguMTExNzk4LDQ1LjA2NDY2NjcgQzIwNC42NTUyOTcsNDUuMDU0MzY0NiAyMDEuODYwNjQ3LDQyLjI1MTMwMDUgMjAxLjg2NzQ5OCwzOC44MDE1OTI3IEMyMDEuODc0NCwzNS4zNTE4ODUgMjA0LjY4MDIwMywzMi41NTk5NDA1IDIwOC4xMzY3MTcsMzIuNTYzMzU4IEMyMTEuNTkzMjMyLDMyLjU2Njc4ODEgMjE0LjM5MzQ3NywzNS4zNjQyODU0IDIxNC4zOTM0OTIsMzguODE0IEMyMTQuNDA1NzY3LDQwLjQ3ODc1MDEgMjEzLjc0NzI4Myw0Mi4wNzg2MDQgMjEyLjU2NjAxNyw0My4yNTQwMzU1IEMyMTEuMzg0NzUxLDQ0LjQyOTQ2NzEgMjA5Ljc3OTc4Niw0NS4wODE4ODE5IDIwOC4xMTE3OTgsNDUuMDY0NjY2NyBaIE0yMDguMTExNzk4LDM1LjE2NTkyNDkgQzIwNi4wOTMwOTEsMzUuMTY1OTI0OSAyMDQuNDU2NjA2LDM2Ljc5OTI2NTIgMjA0LjQ1NjYwNiwzOC44MTQgQzIwNC40NTY2MDYsNDAuODI4NzM0OCAyMDYuMDkzMDkxLDQyLjQ2MjA3NTIgMjA4LjExMTc5OCw0Mi40NjIwNzUyIEMyMDkuMDc4Njc1LDQyLjQ2NjQzMDYgMjEwLjAwNjYxMyw0Mi4wODIxMjIgMjEwLjY4NjI3Miw0MS4zOTU3NzMxIEMyMTEuMzY1OTMsNDAuNzA5NDI0MyAyMTEuNzQwMDUzLDM5Ljc3ODg1NTIgMjExLjcyNDI0LDM4LjgxNCBDMjExLjc0MDA1MywzNy44NDkxNDQ4IDIxMS4zNjU5MywzNi45MTg1NzU3IDIxMC42ODYyNzIsMzYuMjMyMjI2OSBDMjEwLjAwNjYxMywzNS41NDU4NzgxIDIwOS4wNzg2NzUsMzUuMTYxNTY5NCAyMDguMTExNzk4LDM1LjE2NTkyNDkgWiBNMjMyLjk1NTM1LDQ0LjggTDIzMC4zMDQ4MDEsNDQuOCBMMjMwLjMwNDgwMSwzNy40MTY2NjY3IEMyMzAuMzA0ODAxLDM1Ljk2NiAyMjkuNjAyMDg1LDM1LjE2ODY2NjcgMjI4LjMyNDkwNSwzNS4xNjg2NjY3IEMyMjYuODE3OTQsMzUuMTY4NjY2NyAyMjUuOTg2OTcyLDM2LjI0ODY2NjYgMjI1Ljk4Njk3MiwzOC4yMTEzMzMzIEwyMjUuOTg2OTcyLDQ0LjggTDIyMy4zMzkwOTUsNDQuOCBMMjIzLjMzOTA5NSwzNy40MTY2NjY3IEMyMjMuMzM5MDk1LDM2LjM5IDIyMy4wMTMxMiwzNS4xNjg2NjY3IDIyMS40Njg3NDgsMzUuMTY4NjY2NyBDMjIwLjczNjY0MSwzNS4xNjg2NjY3IDIxOS4wMjkyODEsMzUuNDY0NjY2NiAyMTkuMDI5MjgxLDM4LjIxMTMzMzMgTDIxOS4wMjkyODEsNDQuOCBMMjE2LjM3ODczMiw0NC44IEwyMTYuMzc4NzMyLDMyLjc5MjY2NjcgTDIxOS4wMTMyNDksMzIuNzkyNjY2NyBMMjE5LjAxMzI0OSwzMy4zMSBDMjE5Ljc3MzkyMiwzMi44MTAwODM0IDIyMC42Njc2MTIsMzIuNTQ5OTM3IDIyMS41NzgyOTcsMzIuNTYzMzMzMyBDMjIyLjg1MDM4NSwzMi41MTgyODg3IDIyNC4wNzM0NTEsMzMuMDU1NDU3NCAyMjQuODk5NDk5LDM0LjAyMiBDMjI1Ljc4NjQ0OCwzMy4wNzA4MzE0IDIyNy4wMzY1NTQsMzIuNTQwNTU3NiAyMjguMzM4MjY1LDMyLjU2MzMzMzMgQzIzMS4xMzg0NDIsMzIuNTYzMzMzMyAyMzIuOTQ3MzM0LDM0LjQ2NzMzMzMgMjMyLjk0NzMzNCwzNy40MTQgTDIzMi45NTUzNSw0NC44IFogTTIzOC4wMTg2NDcsNDQuOCBMMjM1LjM3MDc3LDQ0LjggTDIzNS4zNzA3NywzMi43OTI2NjY3IEwyMzguMDE4NjQ3LDMyLjc5MjY2NjcgTDIzOC4wMTg2NDcsNDQuOCBaIE0yMzYuNjk2MDQ0LDMxLjg2NzM3MjEgQzIzNi4yNTkzMDcsMzEuODY5NDYwMiAyMzUuODM5Njg4LDMxLjY5Nzk4MDQgMjM1LjUyOTg2MywzMS4zOTA3NjcgQzIzNS4yMjAwMzksMzEuMDgzNTUzNSAyMzUuMDQ1NSwzMC42NjU4ODI0IDIzNS4wNDQ3OTUsMzAuMjMgQzIzNS4wNDQ3OTUsMjkuMzI1NzI1OCAyMzUuNzc5Mjk5LDI4LjU5MjY2NjcgMjM2LjY4NTM1NywyOC41OTI2NjY3IEMyMzcuNTkxNDEzLDI4LjU5MjY2NjcgMjM4LjMyNTkxOCwyOS4zMjU3MjU4IDIzOC4zMjU5MTgsMzAuMjMgQzIzOC4zMjU5MTgsMzEuMTM0Mjc0MiAyMzcuNTkxNDEzLDMxLjg2NzM3MjEgMjM2LjY4NTM1NywzMS44NjczNzIxIEwyMzYuNjk2MDQ0LDMxLjg2NzM3MjEgWiBNMjQwLjQ3MTQ3Myw0NC44IEwyNDAuNDcxNDczLDQzLjA4ODY2NjcgTDI0NS45ODg5OTcsMzUuNDE2NjY2NyBMMjQwLjY4MjU1NSwzNS40MTY2NjY3IEwyNDAuNjgyNTU1LDMyLjc5MjY2NjcgTDI0OS44MTc4NjQsMzIuNzkyNjY2NyBMMjQ5LjgxNzg2NCwzNC41MzkzMzMzIEwyNDQuMzE5MDQ0LDQyLjIxMTMzMzMgTDI1MC4wMjYyNzQsNDIuMjExMzMzMyBMMjUwLjAyNjI3NCw0NC44IEwyNDAuNDcxNDczLDQ0LjggWiBNMjYyLjgwODc2LDQwLjE1NTMzMzMgTDI1My41NjM5MDIsNDAuMTU1MzMzMyBDMjU0LjA1NTUzNiw0MS41ODIgMjU1LjMzMDA0NCw0Mi40NjIgMjU3LjAxMDY4NSw0Mi40NjIgQzI1OC4zMjc5NDMsNDIuNDYyIDI1OS40MTU0MTYsNDEuOTA3MzMzMyAyNTkuOTI1NzU0LDQwLjk3NjY2NjcgTDI2Mi4yMzY5NjksNDIuMzEgQzI2MS4xOTc1OSw0NC4wMyAyNTkuMjM2Mzk4LDQ1LjA1NjY2NjcgMjU2Ljk4OTMwOSw0NS4wNTY2NjY3IEMyNTMuMzM2Nzg4LDQ1LjA1NjY2NjcgMjUwLjY4MzU2OCw0Mi40MjczMzMzIDI1MC42ODM1NjgsMzguODA2IEMyNTAuNjgzNTY4LDM1LjI0MzMzMzMgMjUzLjM1NTQ5MiwzMi41NTUzMzMzIDI1Ni45MDY0NzksMzIuNTU1MzMzMyBDMjYwLjMwNzgzOSwzMi41NTUzMzMzIDI2Mi45OTg0NjcsMzUuMzI4NjY2NyAyNjIuODc1NTU4LDM4Ljg0ODY2NjcgQzI2Mi44NzgyMjgsMzkuMjg1MTM2MSAyNjIuODU1OTI2LDM5LjcyMTQwMTYgMjYyLjgwODc2LDQwLjE1NTMzMzMgWiBNMjUzLjU0Nzg3MSwzNy41MzQgTDI2MC4wMjQ2MTUsMzcuNTM0IEMyNTkuNjY3NzQxLDM2LjExNDIwMDYgMjU4LjM3MjczMiwzNS4xMzA3MzQ3IDI1Ni45MDY0NzksMzUuMTY2IEMyNTUuMjczOTM0LDM1LjE2NiAyNTQuMDE1NDU3LDM2LjA4MzMzMzMgMjUzLjU0Nzg3MSwzNy41MzQgWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1NiAtMjcpIi8+Cjwvc3ZnPgo=" />
                        </Div>
                    </Col>
                    <Col size={{ xs: 6, lg: 8 }}>
                        <Div p=".5rem" d="flex" justify="flex-end">
                            {buttom}
                        </Div>
                    </Col>
                </Row>
            </Div>
        </>
    );
}