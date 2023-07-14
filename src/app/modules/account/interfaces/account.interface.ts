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
