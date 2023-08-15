import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { allProd } from '../store/atom';
import { productType } from 'common';
import { toast } from 'react-hot-toast';
import { Product, UpdateForm } from 'ui';
import axios from 'axios';
import { baseURL } from './SignupPage';

const ProductPage: React.FC = () => {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const [prods, setProds] = useRecoilState(allProd);
  const [product, setProduct] = React.useState<productType>();

  React.useEffect(() => {
    const prod = prods.find((p: productType) => p._id == prodId);
        if (prod) {
            setProduct(prod);
        }
  }, []);

  const handleUpdate = (req: productType) => {
    React.startTransition(() => {

      axios({
        baseURL: baseURL,
        url: `/admin/prod/${prodId}`,
        method: "PUT",
        data: req,
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem('adminToken')
        }
      }).then(response => {
        setProds((pre: productType[]) => {
          let findProd = pre.find(pr => pr._id == prodId);
          findProd = req;
          return pre;
        });
        setProduct(req);
        toast.success(response.data.message);
      }).catch(err => {
        if (err) {
          if (err.response) {
            toast.error(err.response.data.message);
            return;
          }
          console.log('from here')
          console.log(err)
          toast.error(err.message);
        }
      });
    })
  }

  const handleDelete = () => {
    const confirm = prompt('Enter the Product Title to delete:');
    if(confirm != product?.title) {
      return;
    }
    React.startTransition(() => {

      axios({
        baseURL: baseURL,
        url: `/admin/prod/${prodId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem('adminToken')
        }
      }).then(response => {
        setProds((pre: productType[]) => pre.filter(pr => pr._id != prodId));
        toast.success(response.data.message);
        navigate('/admin/prods');
        return;
      }).catch(err => {
        if (err) {
          if (err.response) {
            toast.error(err.response.data.message);
            return;
          }
          console.log('from here')
          console.log(err)
          toast.error(err.message);
        }
      });
    })
  }

  return (
    <>
      <div className="flex flex-row bg-gray-100 justify-around h-screen items-center">
        {product && Object.keys(product).length > 0 && <Product product={product} client={'admin'} />}
        {product && Object.keys(product).length > 0 && <UpdateForm propData={handleUpdate} product={product} handleDelete={handleDelete} />}
        {/* Analytics goes here */}
      </div>
    </>
  )
}

export default ProductPage