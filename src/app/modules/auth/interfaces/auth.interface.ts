export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginRes {
    token: string;
    name: string;
}

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
}