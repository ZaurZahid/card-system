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
    validVal:number,
    stateVal: number,
    typeVal: number,
    expirationDateVal: Date

}

export interface IDepositRq {
    cardVal:number,
    vendorVal: number,
    amount: number,

}

export interface IClientCardRq {
    clientId: string;
    accountId: number,
    cardId: number,
}

export interface IRecoverPasswordRq {
    email: string;
    token: string,
    password: any,
    confirmPassword: string | number
}

export interface IEditProfileRq {
    userId:any,
    email: string;
    firstName: string,
    lastName:string,
    password: any,
    confirmPassword: string | number
}
