import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusBolao } from "../../enums/status-bolao";
import { ErrorResponseType } from "../../types/error-response";
import { ParsedToken } from "../../types/parsed-token";
import { SuccessResponseType } from "../../types/success-response";
import { connect } from '../../utils/database'
import { Bolao } from './../../model/bolao';


export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponseType | SuccessResponseType | any>): Promise<void> {

    const collection = 'boloes';


    switch (req.method) {

        case "POST":
            {
                // TODO: Validar antes se o body é do tipo bolao
                const { db } = await connect();
                const bolao: Bolao = req.body;
                bolao.dtCriacao = new Date();
                bolao.status = StatusBolao.FechadoParaAposta;
                const resVal = await db.collection(collection).insertOne(bolao);
                res.status(200).json({ insertedId: resVal.insertedId });
                break;
            }
        case "GET":
            {
                const { db } = await connect();
                const resVal = await db.collection(collection).find({ }).toArray();
                res.status(200).json(resVal);
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

