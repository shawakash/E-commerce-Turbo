import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { allLegers, allProd } from '../store/atom';
import { legerType, productType } from 'common';
import { Product, PurchaseForm } from 'ui';
import axios from 'axios';
import { baseURL } from './SignupPage';
import { toast } from 'react-hot-toast';

export const ProductPage: React.FC = () => {

    const { prodId } = useParams();
    const navigate = useNavigate();
    const prods = useRecoilValue(allProd);
    const setLeger = useSetRecoilState(allLegers);
    const [product, setProduct] = useState<productType>()

    useEffect(() => {
        const prod = prods.find((p: productType) => p._id == prodId);
        if (prod) {
            setProduct(prod);
        }
    }, []);

    const handlePurchase = (leger: legerType) => {
        axios({
            baseURL: baseURL,
            url: `/user/prod/${prodId}`,
            method: 'POST',
            data: leger,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('userToken')
            }
        }).then(response => {
            setLeger((leg: legerType[]) => [...leg, response.data.leger]);
            toast.success(response.data.message);
            navigate('/user/prod/purchase')
            return;
        }).catch(err => {
            if(err.status == 500) {
                toast.error('Internal Server Error');
                navigate('/user/login');
                return;
            }
            console.log(err)
            toast.error(err.message);
            // setLoader(false);
            return;
        })
    }

    return (
        <>
            <div className="flex flex-row justify-around gap-x- items-center h-screen bg-gray-100">
                {product && <Product product={product} client='user' />}
                {product && <PurchaseForm product={product} propData={handlePurchase} />}
            </div>
        </>
    )
}
