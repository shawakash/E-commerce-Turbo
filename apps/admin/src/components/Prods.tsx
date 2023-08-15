import * as React from 'react'
import { useRecoilState } from 'recoil'
import { allProd } from '../store/atom'
import axios from 'axios';
import { baseURL } from './SignupPage';
import { toast } from 'react-hot-toast';
import { ProdCard } from 'ui';
import { productType } from 'common';

export const Prods: React.FC = () => {

    const [prods, setAllProds] = useRecoilState(allProd);

    const request = () => {
        axios({
            baseURL: baseURL,
            url: '/admin/prod/prods',
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('adminToken')
            }
        }).then(response => {
            setAllProds(response.data.prods);
        }).catch(err => {
            toast.error(err.message);
            return;
        })
    }

    React.useEffect(() => {

            request();
    }, [])

    return (
        <>
            <div className="min-h-screen flex items-center gap-10 flex-wrap justify-center bg-gray-100">
                {prods &&
                    prods.map((prod: productType) =>
                        <ProdCard key={prod._id} product={prod} />
                    )
                }
            </div>
        </>
    )
}
