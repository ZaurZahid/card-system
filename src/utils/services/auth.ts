import { Axios } from "../axios"
import { ILoginRq } from './../interfaces/models';
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