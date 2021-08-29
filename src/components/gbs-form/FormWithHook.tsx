import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useForm } from "react-hook-form";

const GbsForm = ({ children }) => {
    const state = useForm();
    const { keycloak } = useKeycloak<KeycloakInstance>()

    return children(state, keycloak);
}


export default GbsForm;