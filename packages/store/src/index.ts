import { atom, selector } from "recoil";

export const baseURL = `http://localhost:5001`;

export const loadingState = atom({
    key: 'loadingState',
    default: false
});


export const adminData = atom({
    key: "adminData",
    default: {}
});
