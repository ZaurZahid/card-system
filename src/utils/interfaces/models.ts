export interface ILoginRq {
    email: string;
    password: string,
}

export interface IAccountRq {
    balanceVal: number;
    accountNumberVal: string,
}

export interface IClientCardRq {
    clientId: string;
    accountId: number,
    cardId: number,
}
