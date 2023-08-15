import { atom } from "recoil";

export const loadingState = atom({
    key: 'loadingState',
    default: false
});

export const baseURL = 'http://localhost:5001';