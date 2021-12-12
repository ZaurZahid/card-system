import { Axios } from "../axios";
import {IVendorRq } from "../interfaces/models";
import { getJWT } from '../index';

export const getVendors = async () => {
    const resp = await Axios.get('Vendor', getJWT());

    return resp
};

export const addVendorService = ({ nameVal,phoneVal, emailVal}: IVendorRq) => {
    return Axios.post(`Vendor`,
        {
          name:nameVal,
          phone:phoneVal,
          email: emailVal,
          
        },
        getJWT()
    );
}