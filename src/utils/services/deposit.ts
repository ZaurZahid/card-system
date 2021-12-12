import { Axios } from "../axios";
import { IDepositRq } from "../interfaces/models";
import { getJWT } from './../index';



export const getCards = async () => {
    const resp = await Axios.get('Card', getJWT());

    return resp
};

export const getTypes = async () => {
    const resp = await Axios.get('Enum/GetCardTypes', getJWT());

    return resp
};

export const getStates = async () => {
    const resp = await Axios.get('Enum/GetCardStates', getJWT());

    return resp
};



export const addDepositService = ({ amount, cardId, vendorId,type,status,clientId }: IDepositRq) => {
    return Axios.post(`Deposit`,
        {
            amount,
            cardId,
            vendorId,
            type,
            status,
            clientId
        },
        getJWT()
    );
}