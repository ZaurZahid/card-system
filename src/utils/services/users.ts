import { Axios } from "../axios";
import {IUserRq } from "../interfaces/models";
import { getJWT } from './../index';

export const getUsers = async () => {
    const resp = await Axios.get('AppUser', getJWT());

    return resp
};

export const addUserService = ({ firstNameVal, lastNameVal,emailVal, passwordVal,confirmPasswordVal}: IUserRq) => {
    return Axios.post(`AppUser`,
        {
          firstName:firstNameVal,
          lastName:lastNameVal,
          email: emailVal,
          password: passwordVal,
          confirmPassword: confirmPasswordVal
        },
        getJWT()
    );
}