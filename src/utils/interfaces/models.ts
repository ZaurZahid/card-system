export interface ILoginRq {
    email: string;
    password: string,
}

export interface IAccountRq {
    balanceVal: number;
    accountNumberVal: string,
}
export interface IUserRq {
    firstNameVal: string,
    lastNameVal: string,
    emailVal: string,
    passwordVal: string,
    confirmPasswordVal: string

}
export interface IVendorRq {
    nameVal: string,
    emailVal: string,
    phoneVal: string

}
// export interface IVendorAddressRq {
//     nameVal: string,
//     emailVal: string,
//     phoneVal: string

// }
export interface ICardRq {
    numberVal: string,
    cvvVal: string,
    validVal:Boolean,
    stateVal: number,
    typeVal: number,
    dateRegisteredVal:Date,
    expirationDateVal: Date

}

export interface IClientCardRq {
    clientId: string;
    accountId: number,
    cardId: number,
}

export interface IDepositRq {
    amount: number,
    cardId: number,
    vendorId:number,
    type: boolean,
    status:boolean,
    clientId:string
}

export interface IRecoverPasswordRq {
    email: string;
    token: string,
    password: any,
    confirmPassword: string | number
}
