export interface AccountParams {
    id?: number,
    accountNumber?: string,
    balance?: number
}

export interface TransactionParams {
    client: any,
    card: any,
    amount: number,
    vendor: any,
    createdAt: Date,
    typeName:string,
    statusName: string
}

export interface UserParams {
    id?: string,
   firstName:string,
   lastName:string,
   email:string,
   lastLoginTime:Date,
   lastPasswordChangeDate:Date

}
export interface VendorParams {
  
    id: string,
    name: string,
    phone: string,
    email:string

}
// export interface VendorAddressParams {
  
//     id: string,
//     name: string,
//     phone: string,
//     email:string

// }
export interface CardParams {
    id?:string,
    number: string,
    cvv: number,
    state: number,
    type: number,
    valid:boolean,
    dateRegistered:Date,
    expirationDate: Date,
    stateName:string,
    typeName: string
}
