export type TSignIn = {
    email: string;
    password: string;
}

export type TPasswordChange = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}