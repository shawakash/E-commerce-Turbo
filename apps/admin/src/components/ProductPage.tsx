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
    React.startTransition(() => {

      axios({
        baseURL: baseURL,
        url: `/admin/prod/${prodId}`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('adminToken')
        }
      }).then(response => {
        setProduct(response.data.prod);
      }).catch(err => {
        toast.error(err.message);
        navigate(-1);
      })
    })
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
      <div className="flex flex-row">
        <Product product={product} client={'admin'} />
        <UpdateForm propData={handleUpdate} product={product} handleDelete={handleDelete} />
        {/* Analytics goes here */}
      </div>
    </>
  )
}

export default ProductPage