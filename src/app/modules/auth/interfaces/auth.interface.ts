export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginRes {
    token: string;
    name: string;
}