import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponseType } from "../../types/error-response";
import { ParsedToken } from "../../types/parsed-token";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponseType>): Promise<void> {

    switch (req.method) {

        case "POST":
            {
                break;
            }
        case "GET":
            {
                break;
            }
        case "PUT":
            {
                break;
            }
        case "DELETE":
            {
                break;
            }
        default:
            {
                break
            }
    }
}

