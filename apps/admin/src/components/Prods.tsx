import * as React from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { allProd, getProds } from '../store/atom'
import axios from 'axios';
import { baseURL } from './SignupPage';
import { toast } from 'react-hot-toast';
import { ProdCard } from 'ui';
import { productType } from 'common';

export const Prods: React.FC = () => {


    const prods = useRecoilValueLoadable(getProds);
    

    return (
        <>
            {prods.state == 'hasValue' &&  <div className="min-h-screen flex items-center gap-10 flex-wrap justify-center bg-gray-100">
                {prods &&
                    prods.contents.map((prod: productType) =>
                        <ProdCard key={prod._id} product={prod} />
                    )
                }
            </div>}
        </>
    )
}
