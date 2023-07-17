export interface ITransaction {
    _id: string;
    userId: string;
    transactionId: string;
    categoryName: string;
    categoryId: string;
    particular: string;
    note: string;
    type: string;
    amount: number;
    accountName: string;
    accountId: string;
    accountNumber: string;
    currency: string;
    date: string;
}

export interface ITransactionRes {
    transactions: ITransaction[];
    totalTransactions: number;
}

export interface ICreateTransaction {
    transactionId: string;
    categoryId: string;
    particular: string;
    note: string;
    type: string;
    amount: number;
    accountId: string;
    currency: string;
}

export interface ICategory {
    _id: string;
    userId: string;
    name: string;
    rank: string;
    date: string;
}

export interface ICategoryRes {
    categories: ICategory[];
    totalCategories: number;
}
