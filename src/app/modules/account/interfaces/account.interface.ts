export interface IAccountList {
    _id: string;
    userId: string;
    name: string;
    number: string;
    balance: number;
    note: string;
    updated: string;
    date: string;
}

export interface IAccountsResponse {
    accounts: IAccountList[];
    totalAccounts: number;
}

export interface ICreateAccount {
    name: string;
    number: string;
    note: string;
}

export interface IAccoutDetails {
    _id: string;
    userId: string;
    name: string;
    number: string;
    balance: number;
    note: string;
    updated: string;
    date: string;
}