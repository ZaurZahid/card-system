export interface Parameters {
    parameterId?: number;
    parameterName?: string;
    parameterValue?: string;
}

export interface SingleGood {
    barcode?: string,
    cartCount?: number,
    commentCount?: number,
    compilationName?: string,
    description?: string,
    discountPrice?: any,
    discountRate?: number,
    guid?: string,
    id?: number,
    inFavorite?: boolean,
    name?: string,
    parentId?: number,
    price?: number,
    producerId?: number,
    producerName?: string,
    partnerId?: number,
    partnerName?: string,
    rate?: number,
    guaranteeTime?: number
    haveFreeDelivery?: boolean
    haveGuarantee?: boolean
    inCart?: boolean
    inWaitingList?: boolean,
    balance?: number
}

export interface Comment {
    goodsId?: number,
    username?: string,
    comment?: string,
    createDate?: any,
    rate?: number
}
export interface SingleProduct {
    product: {
        goods: SingleGood,
        sameGoods?: SingleGood[];
        withItGoods?: SingleGood[];
        parameters?: Parameters[];
        images?: string[];
        comments?: Comment[];
        creditCards?: string[];
    };
}

export interface CompilationGood {
    id?: number;
    goodsId?: number;
    inWaiting?: boolean;
    inFavorite?: boolean;
    imageUrl?: string;
    producerName?: string;
    name?: string;
    price?: number;
    currentBalance?: number;
    inCart?: boolean;
    inStock?: boolean;
    inWaitingList?: boolean;
    discountRate?: string;
    compilationId?: any
    compilationName?: any
    discountPrice?: any
    guid?: any
    parentId?: number;
    producerId?: number;
    partnerId?: number;
    partnerName?: string;
    haveDiscount?: boolean;
}

export interface WaitingGood {
    id?: number;
    goodsId?: number;
    guid?: any
    name?: string;
    price?: number;
    discountPrice?: any
    addedDate?: any
    discountRate?: string;
    haveImage?: boolean;
    imageUrl?: string;
}

export interface MyOrder {
    id?: number;
    date?: any
    amount?: number;
    count?: number;
}
export interface MyOrderInfo {
    guid?: any;
    image?: any;
    name?: any;
    count?: number;
    amount?: number;
    totalAmount?: number;
}

export interface Promo {
    id?: number;
    fromDate?: any;
    toDate?: any;
    uniqueCode?: any;
    partnerId?: number,
    partnerName?: string,
    campaignId?: number,
    campaignName?: any,
    discount?: any,
    typeId?: number,
    promoCodeImage?: any
}

export interface Transactions {
    amount: number;
    date: any;
    typeName: any;
}