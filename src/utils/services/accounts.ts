import { Axios } from "../axios";
import { IAccountRq } from "../interfaces/models";
import { getJWT } from './../index';

export const getAccounts = async () => {
    const resp = await Axios.get('Account', getJWT());

    return resp
};

export const addAccountService = ({ accountNumberVal, balanceVal }: IAccountRq) => {
    return Axios.post(`Account`,
        {
            accountNumber: accountNumberVal,
            balance: balanceVal,
        },
        getJWT()
    );
}