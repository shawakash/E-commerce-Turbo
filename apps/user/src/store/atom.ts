import { atom, selector } from "recoil";
import { baseURL } from "../components/SignupPage";
import axios from "axios";


export const getProds = selector({
    key: 'getProds',
    get: async () => {
        const response = await axios({
            baseURL: baseURL,
            url: '/user/prods',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('userToken')
            }
        });
        return response.data.prods;
    }
});

export const allProd = atom({
    key: 'allProd',
    default: getProds
});

export const getlegers = selector({
    key: 'getlegers',
    get: async () => {
        const response = await axios({
            baseURL: baseURL,
            url: '/user/purchased',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('userToken')
            }
        });
        return response.data.purchasedProd;
    }
});

export const allLegers = atom({
    key: 'allLegers',
    default: getlegers
})

