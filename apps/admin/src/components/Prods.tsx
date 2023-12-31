import * as React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { getProds } from '../store/atom'
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
