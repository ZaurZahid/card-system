import { Axios } from "../axios";
import { IClientCardRq } from "../interfaces/models";
import { getJWT } from './../index';

export const getAllClientCards = async () => {
    const resp = await Axios.get('ClientCard', getJWT());

    return resp
};

export const getClientCards = async (userId:any) => {
    const resp = await Axios.get('ClientCard', getJWT());

    return resp
};

export const getClientCard = async (id: number) => {
    const resp = await Axios.get(`Card/${id}`, getJWT());

    return resp
};

export const getCards = async () => {
    const resp = await Axios.get('Card', getJWT());

    return resp
};

export const getAccounts = async () => {
    const resp = await Axios.get('Account', getJWT());

    return resp
};

export const getUsers = async () => {
    const resp = await Axios.get('AppUser', getJWT());

    return resp
};


export const addAccountService = ({ clientId, accountId, cardId }: IClientCardRq) => {
    return Axios.post(`ClientCard`,
        {
            clientId,
            accountId,
            cardId,
        },
        getJWT()
    );
}