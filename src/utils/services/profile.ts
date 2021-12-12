import { Axios } from "../axios"
import { IEditProfileRq, ILoginRq, IRecoverPasswordRq } from './../interfaces/models';
import { getJWT } from './../index';


export const getUserService = async (userId: any) => {
    const resp = await Axios.get(`AppUser/GetUserById?userId=${userId}`, getJWT());

    return resp
};

export const editProfileService = ({userId, email, firstName,lastName, password, confirmPassword }: IEditProfileRq) => {
    return Axios.put(`AppUser`,
        {
            userId, email, firstName,lastName, password: password.toString(), confirmPassword: confirmPassword.toString()
        },
        getJWT()
    );
}

