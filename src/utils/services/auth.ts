import { Axios } from "../axios"
import { ILoginRq, IRecoverPasswordRq } from './../interfaces/models';
import { getJWT } from './../index';

export const loginService = ({ email, password }: ILoginRq) => {
    return Axios.post(`Login`,
        {
            email,
            password,
        },
        getJWT()
    );
}

export const logoutService = () => {
    return Axios.get(`Logout`)
}

export const forgetPasswordService = ({ email }: { email: string }) => {
    return Axios.post(`ForgotPasswordTokens`,
        {
            email
        },
        getJWT()
    );
}

export const recoverPasswordService = ({ email, token, password, confirmPassword }: IRecoverPasswordRq) => {
    return Axios.post(`ForgotPasswordConfirmations`,
        {
            email, token, password: password.toString(), confirmPassword: confirmPassword.toString()
        }
    );
}

