import { atom, selector } from "recoil";
import { baseURL } from "../components/SignupPage";
import axios from "axios";


export const getProds = selector({
    key: 'getProds',
    get: async () => {
        const response = await axios({
            baseURL: baseURL,
            url: '/admin/prod/prods',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('adminToken')
            }
        });
        return response.data.prods;
    }
})

export const allProd = atom({
    key: 'allProd',
    default: getProds
});