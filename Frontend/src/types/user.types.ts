export interface User {
    _id?: string;
    email?: string;
    name?: string;
    password?: string;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LoginData extends Pick<User, 'email' | 'password'> { };
export interface RegisterData extends Pick<User, 'name' | 'email' | 'password'> {
    confirmPassword?: string;
};