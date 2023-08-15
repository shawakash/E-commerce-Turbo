import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { allProd } from '../store/atom';
import { productType } from 'common';
import { toast } from 'react-hot-toast';
import { Product } from 'ui';

export const ProductPage: React.FC = () => {
    const { prodId } = useParams();
    console.log(prodId)
    const prods = useRecoilValue(allProd);
    console.log(prods)
    const [product, setProduct] = React.useState<productType>();

    const pr = prods.find((prod: productType) => prod._id == prodId);
    console.log(pr)
    React.useEffect(() => {
        if(!pr) {
            toast.error('No such Product');
            return;
        }
        setProduct(pr);
    }, [])

  return (
    <>
      <Product product={product} />
    </>
  )
}
